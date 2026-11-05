/**
 * NumberQuest Multiplayer & Cloud Service
 * Powered by Supabase Realtime Database
 */
class MultiplayerManager {
    constructor() {
        this.client = window.sbClient;
        this.currentRoom = null;
        this.isHost = false;
        this.playerName = localStorage.getItem("nq_player_name") || "Adventurer";
        this.roomChannel = null;
        this.players = [];

        this.initUI();
    }

    initUI() {
        // Modal elements
        this.modal = document.getElementById("multiplayer-modal");
        this.btnOpen = document.getElementById("btn-open-multiplayer");
        this.btnClose = document.getElementById("btn-close-multiplayer");

        // Views inside modal
        this.viewLobby = document.getElementById("mp-view-lobby");
        this.viewRoom = document.getElementById("mp-view-room");

        // Action buttons
        this.btnCreate = document.getElementById("btn-mp-create");
        this.btnJoin = document.getElementById("btn-mp-join");
        this.btnStart = document.getElementById("btn-mp-start");
        this.btnLeave = document.getElementById("btn-mp-leave");

        // Input & Labels
        this.inputCode = document.getElementById("input-mp-code");
        this.lblRoomCode = document.getElementById("lbl-mp-room-code");
        this.playersList = document.getElementById("mp-players-list");
        this.mpStatusText = document.getElementById("mp-status-text");

        this.bindEvents();
    }

    bindEvents() {
        if (this.btnOpen) {
            this.btnOpen.addEventListener("click", () => this.openModal());
        }

        if (this.btnClose) {
            this.btnClose.addEventListener("click", () => this.closeModal());
        }

        if (this.btnCreate) {
            this.btnCreate.addEventListener("click", () => this.createRoom());
        }

        if (this.btnJoin) {
            this.btnJoin.addEventListener("click", () => {
                const code = (this.inputCode.value || "").trim().toUpperCase();
                if (!code) {
                    alert("Masukkan kode Room (contoh: EDU77) terlebih dahulu!");
                    return;
                }
                this.joinRoom(code);
            });
        }

        if (this.btnStart) {
            this.btnStart.addEventListener("click", () => this.startMatch());
        }

        if (this.btnLeave) {
            this.btnLeave.addEventListener("click", () => this.leaveRoom());
        }
    }

    openModal() {
        if (!this.modal) return;
        this.playerName = window.game ? window.game.playerName : (localStorage.getItem("nq_player_name") || "Adventurer");
        this.modal.classList.remove("hidden");
        this.modal.classList.add("flex");
        this.showLobbyView();
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.add("hidden");
        this.modal.classList.remove("flex");
    }

    showLobbyView() {
        if (this.viewLobby) this.viewLobby.classList.remove("hidden");
        if (this.viewRoom) this.viewRoom.classList.add("hidden");
    }

    showRoomView(roomCode) {
        if (this.viewLobby) this.viewLobby.classList.add("hidden");
        if (this.viewRoom) this.viewRoom.classList.remove("hidden");
        if (this.lblRoomCode) this.lblRoomCode.textContent = roomCode;
        if (this.btnStart) {
            this.btnStart.style.display = this.isHost ? "inline-flex" : "none";
        }
    }

    generateRoomCode() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "EDU";
        for (let i = 0; i < 3; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    async createRoom() {
        if (!this.client) {
            alert("Koneksi Supabase belum aktif. Pastikan perangkat terhubung internet.");
            return;
        }

        const roomCode = this.generateRoomCode();
        this.isHost = true;
        this.currentRoom = roomCode;

        try {
            // 1. Create Room in Supabase
            const { error: roomErr } = await this.client
                .from("game_rooms")
                .insert({
                    room_code: roomCode,
                    host_name: this.playerName,
                    status: "waiting",
                    realm: "realm1"
                });

            if (roomErr) throw roomErr;

            // 2. Add Host to room_players
            const { error: playerErr } = await this.client
                .from("room_players")
                .insert({
                    room_code: roomCode,
                    player_name: this.playerName,
                    is_host: true,
                    is_ready: true,
                    score: 0,
                    combo: 0,
                    lives: 3
                });

            if (playerErr) throw playerErr;

            this.showRoomView(roomCode);
            this.subscribeRoom(roomCode);
            await this.refreshPlayers(roomCode);

            if (window.soundManager) window.soundManager.playCorrect();
            if (window.game) window.game.showToast("Room Dibuat!", `Bagikan kode ${roomCode} ke teman sekelas.`);
        } catch (err) {
            console.error("Create room error:", err);
            alert("Gagal membuat room: " + (err.message || err));
        }
    }

    async joinRoom(roomCode) {
        if (!this.client) {
            alert("Koneksi Supabase belum aktif.");
            return;
        }

        try {
            // 1. Check if room exists
            const { data: rooms, error: roomErr } = await this.client
                .from("game_rooms")
                .select("*")
                .eq("room_code", roomCode)
                .single();

            if (roomErr || !rooms) {
                alert(`Room "${roomCode}" tidak ditemukan! Periksa kembali kode room.`);
                return;
            }

            if (rooms.status !== "waiting") {
                alert(`Room "${roomCode}" sudah memulai permainan atau sudah selesai.`);
                return;
            }

            this.isHost = false;
            this.currentRoom = roomCode;

            // 2. Add player to room_players (upsert on duplicate name)
            const { error: playerErr } = await this.client
                .from("room_players")
                .upsert({
                    room_code: roomCode,
                    player_name: this.playerName,
                    is_host: false,
                    is_ready: true,
                    score: 0,
                    combo: 0,
                    lives: 3
                }, { onConflict: "room_code, player_name" });

            if (playerErr) throw playerErr;

            this.showRoomView(roomCode);
            this.subscribeRoom(roomCode);
            await this.refreshPlayers(roomCode);

            if (window.soundManager) window.soundManager.playCorrect();
            if (window.game) window.game.showToast("Berhasil Masuk Room!", `Menunggu Host memulai permainan...`);
        } catch (err) {
            console.error("Join room error:", err);
            alert("Gagal bergabung ke room: " + (err.message || err));
        }
    }

    subscribeRoom(roomCode) {
        if (this.roomChannel) {
            this.client.removeChannel(this.roomChannel);
        }

        this.roomChannel = this.client
            .channel(`room-${roomCode}`)
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "room_players",
                filter: `room_code=eq.${roomCode}`
            }, (payload) => {
                this.refreshPlayers(roomCode);
                // Also update in-game live scoreboard if match is running
                if (window.game && window.game.isMultiplayer) {
                    this.updateLiveInGameLeaderboard();
                }
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "game_rooms",
                filter: `room_code=eq.${roomCode}`
            }, (payload) => {
                const updatedRoom = payload.new;
                if (updatedRoom && updatedRoom.status === "playing") {
                    this.handleMatchStarted();
                }
            })
            .subscribe();
    }

    async refreshPlayers(roomCode) {
        if (!this.client) return;
        const { data, error } = await this.client
            .from("room_players")
            .select("*")
            .eq("room_code", roomCode)
            .order("score", { ascending: false });

        if (error || !data) return;
        this.players = data;
        this.renderPlayersList();
    }

    renderPlayersList() {
        if (!this.playersList) return;
        this.playersList.innerHTML = "";

        this.players.forEach((p, idx) => {
            const card = document.createElement("div");
            card.className = "flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60";
            
            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs">
                        ${idx + 1}
                    </div>
                    <div>
                        <div class="font-bold text-xs md:text-sm text-slate-100 flex items-center gap-1.5">
                            ${p.player_name}
                            ${p.is_host ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">Host</span>' : ''}
                        </div>
                        <div class="text-[11px] text-slate-400">
                            Skor: <span class="text-amber-400 font-semibold">${p.score}</span> | Nyawa: ${p.lives} ❤️
                        </div>
                    </div>
                </div>
                <div class="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Ready
                </div>
            `;
            this.playersList.appendChild(card);
        });

        if (this.mpStatusText) {
            this.mpStatusText.textContent = `${this.players.length} Pemain di dalam Ruangan`;
        }
    }

    async startMatch() {
        if (!this.isHost || !this.currentRoom || !this.client) return;

        try {
            await this.client
                .from("game_rooms")
                .update({ status: "playing" })
                .eq("room_code", this.currentRoom);
        } catch (e) {
            console.error("Error starting match:", e);
        }
    }

    handleMatchStarted() {
        this.closeModal();
        if (window.soundManager) window.soundManager.playVictory();
        if (window.game) {
            window.game.startMultiplayerMatch(this.currentRoom, this.isHost);
        }
    }

    async updateProgress(score, combo, lives) {
        if (!this.client || !this.currentRoom) return;
        try {
            await this.client
                .from("room_players")
                .update({
                    score: score,
                    combo: combo,
                    lives: lives,
                    last_active: new Date().toISOString()
                })
                .match({
                    room_code: this.currentRoom,
                    player_name: this.playerName
                });
        } catch (e) {
            console.warn("Failed to sync progress:", e);
        }
    }

    async updateLiveInGameLeaderboard() {
        if (!this.client || !this.currentRoom) return;
        const { data } = await this.client
            .from("room_players")
            .select("player_name, score, combo, lives, is_host")
            .eq("room_code", this.currentRoom)
            .order("score", { ascending: false });

        if (data && window.game) {
            window.game.renderLiveMultiplayerBar(data);
        }
    }

    async leaveRoom() {
        if (this.client && this.currentRoom) {
            try {
                await this.client
                    .from("room_players")
                    .delete()
                    .match({
                        room_code: this.currentRoom,
                        player_name: this.playerName
                    });

                if (this.isHost) {
                    await this.client
                        .from("game_rooms")
                        .update({ status: "finished" })
                        .eq("room_code", this.currentRoom);
                }
            } catch (e) {}

            if (this.roomChannel) {
                this.client.removeChannel(this.roomChannel);
                this.roomChannel = null;
            }
        }

        this.currentRoom = null;
        this.isHost = false;
        this.showLobbyView();
    }

    // Cloud Leaderboard Service
    async saveGlobalScore(name, score, level, accuracy, realm) {
        if (!this.client || score <= 0) return;
        try {
            await this.client.from("leaderboard").insert({
                player_name: name,
                score: score,
                level: level,
                accuracy: accuracy,
                realm_reached: realm
            });
            console.log("☁️ Global Leaderboard Saved to Supabase");
        } catch (e) {
            console.warn("Save leaderboard error:", e);
        }
    }

    async fetchGlobalLeaderboard() {
        if (!this.client) return null;
        try {
            const { data, error } = await this.client
                .from("leaderboard")
                .select("*")
                .order("score", { ascending: false })
                .limit(10);

            if (error) throw error;
            return data;
        } catch (e) {
            console.warn("Fetch leaderboard error:", e);
            return null;
        }
    }
}

// Instantiate and expose globally
window.multiplayerManager = new MultiplayerManager();
