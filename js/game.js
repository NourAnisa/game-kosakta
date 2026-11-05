// ============================================================
// NumberQuest: Core Game Engine
// Gamified English Math Learning Adventure for SMP
// ============================================================

class NumberQuestGame {
    constructor() {
        this.playerName = localStorage.getItem("nq_player_name") || "Adventurer";
        this.mode = "adventure"; // 'adventure' or 'survival'
        this.currentRealm = 1;
        this.realmQuestions = [];
        this.qIndex = 0;
        this.currentQ = null;

        // Player Stats
        this.score = 0;
        this.xp = 0;
        this.level = 1;
        this.lives = 3;
        this.maxLives = 3;
        this.streak = 0;
        this.bestStreak = 0;

        // Timer
        this.maxTime = 20; // seconds per question
        this.timeLeft = 20;
        this.timerId = null;
        this.isAnswered = false;

        // Persistence
        this.unlockedRealms = JSON.parse(localStorage.getItem("nq_unlocked_realms")) || [1];
        this.unlockedAchievements = JSON.parse(localStorage.getItem("nq_achievements")) || [];
        this.leaderboard = JSON.parse(localStorage.getItem("nq_leaderboard")) || this.getDefaultLeaderboard();

        // Level titles
        this.levelTitles = [
            "Novice Counter",
            "Number Scout",
            "Math Explorer",
            "Fraction Fighter",
            "Calculation Knight",
            "Equation Ranger",
            "Logic Champion",
            "Arithmetic Paladin",
            "Master of Numera",
            "Grand Archmage"
        ];

        this.initDOM();
    }

    getDefaultLeaderboard() {
        return [
            { name: "Rizky (SMP 1)", score: 1420, level: 6, realm: "Citadel", date: "2026-11-01" },
            { name: "Nadia (SMP 7)", score: 1150, level: 5, realm: "Cavern", date: "2026-11-02" },
            { name: "Farhan (SMP 2)", score: 980, level: 4, realm: "Valley", date: "2026-11-03" },
            { name: "Alya (SMP 4)", score: 720, level: 3, realm: "Forest", date: "2026-11-04" },
            { name: "Dimas (SMP 9)", score: 450, level: 2, realm: "Isle", date: "2026-11-05" }
        ];
    }

    initDOM() {
        // Cache elements
        this.elScore = document.getElementById("hud-score");
        this.elXp = document.getElementById("hud-xp");
        this.elXpBar = document.getElementById("hud-xp-bar");
        this.elLevel = document.getElementById("hud-level");
        this.elLevelTitle = document.getElementById("hud-level-title");
        this.elLives = document.getElementById("hud-lives");
        this.elStreak = document.getElementById("hud-streak");
        this.elTimer = document.getElementById("hud-timer-sec");
        this.elTimerBar = document.getElementById("hud-timer-bar");

        this.elRealmTitle = document.getElementById("game-realm-title");
        this.elRealmIcon = document.getElementById("game-realm-icon");
        this.elQuestionCategory = document.getElementById("q-category");
        this.elQuestionText = document.getElementById("q-text");
        this.elQuestionClue = document.getElementById("q-clue");
        this.elOptionsGrid = document.getElementById("options-grid");
        this.elQuestionCounter = document.getElementById("q-counter");

        // Modals & Panels
        this.elFeedbackModal = document.getElementById("feedback-modal");
        this.elFeedbackTitle = document.getElementById("fb-title");
        this.elFeedbackIcon = document.getElementById("fb-icon");
        this.elFeedbackBody = document.getElementById("fb-body");
        this.elFeedbackExplanation = document.getElementById("fb-explanation");
        this.elFeedbackNextBtn = document.getElementById("fb-next-btn");

        this.elGameOverModal = document.getElementById("gameover-modal");
        this.elVictoryModal = document.getElementById("victory-modal");
        this.elMapModal = document.getElementById("map-modal");
        this.elLeaderboardModal = document.getElementById("leaderboard-modal");
        this.elAchievementsModal = document.getElementById("achievements-modal");

        this.elPlayerNameDisplay = document.getElementById("player-name-display");
        if (this.elPlayerNameDisplay) {
            this.elPlayerNameDisplay.textContent = this.playerName;
        }

        this.updateHUD();
        this.renderMap();
        this.renderLeaderboard();
        this.renderAchievements();
    }

    setPlayerName(name) {
        if (!name || !name.trim()) return;
        this.playerName = name.trim().substring(0, 15);
        localStorage.setItem("nq_player_name", this.playerName);
        if (this.elPlayerNameDisplay) {
            this.elPlayerNameDisplay.textContent = this.playerName;
        }
    }

    startAdventure(realmId = 1) {
        window.soundManager.playClick();
        this.mode = "adventure";
        this.currentRealm = realmId;
        this.realmQuestions = QUESTIONS_DATABASE.filter(q => q.realm === realmId);
        // Shuffle questions in realm
        this.realmQuestions = [...this.realmQuestions].sort(() => Math.random() - 0.5);
        this.qIndex = 0;
        this.lives = this.maxLives;
        this.streak = 0;

        const realmMeta = REALMS_DATA.find(r => r.id === realmId) || REALMS_DATA[0];
        if (this.elRealmTitle) this.elRealmTitle.textContent = realmMeta.title;
        if (this.elRealmIcon) this.elRealmIcon.textContent = realmMeta.icon;

        this.closeAllModals();
        this.showScreen("screen-game");
        this.loadQuestion();
    }

    startMultiplayerMatch(roomCode, isHost) {
        this.mode = "multiplayer";
        this.isMultiplayer = true;
        this.score = 0;
        this.qIndex = 0;
        this.lives = 3;
        this.streak = 0;
        this.realmQuestions = [...QUESTIONS_DATABASE].sort(() => Math.random() - 0.5).slice(0, 10);

        if (this.elRealmTitle) this.elRealmTitle.textContent = `Duel Room: ${roomCode}`;
        if (this.elRealmIcon) this.elRealmIcon.textContent = "⚔️";

        const mpLiveBar = document.getElementById("multiplayer-live-bar");
        if (mpLiveBar) mpLiveBar.classList.remove("hidden");

        this.closeAllModals();
        this.showScreen("screen-game");
        this.loadQuestion();

        if (window.multiplayerManager) {
            window.multiplayerManager.updateProgress(0, 0, 3);
            window.multiplayerManager.updateLiveInGameLeaderboard();
        }
    }

    renderLiveMultiplayerBar(players) {
        const barEl = document.getElementById("multiplayer-live-bar-content");
        if (!barEl) return;
        barEl.innerHTML = "";
        players.forEach((p, idx) => {
            const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`;
            const isMe = p.player_name === this.playerName;
            const tag = document.createElement("div");
            tag.className = `inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${isMe ? 'bg-indigo-600/90 text-white ring-1 ring-indigo-300' : 'bg-slate-800/80 text-slate-300'}`;
            tag.innerHTML = `<span>${medal}</span> <span>${p.player_name}:</span> <span class="text-amber-300 font-bold">${p.score}</span>`;
            barEl.appendChild(tag);
        });
    }

    async loadCloudLeaderboard() {
        const listEl = document.getElementById("leaderboard-list");
        if (!listEl) return;
        listEl.innerHTML = '<div class="text-center py-6 text-xs text-slate-400 animate-pulse">Memuat Peringkat Cloud Supabase...</div>';

        if (window.multiplayerManager) {
            const cloudData = await window.multiplayerManager.fetchGlobalLeaderboard();
            if (cloudData && cloudData.length > 0) {
                listEl.innerHTML = "";
                cloudData.forEach((item, idx) => {
                    const rankIcon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`;
                    const row = document.createElement("div");
                    row.className = `flex items-center justify-between p-3 rounded-xl border ${idx === 0 ? "bg-amber-950/40 border-amber-500/50" : "bg-slate-800/60 border-slate-700/60"}`;
                    row.innerHTML = `
                        <div class="flex items-center gap-3">
                            <span class="w-7 text-center font-bold ${idx < 3 ? "text-base" : "text-slate-400 text-sm"}">${rankIcon}</span>
                            <div>
                                <p class="font-bold text-slate-100 text-sm md:text-base">${item.player_name}</p>
                                <p class="text-xs text-slate-400">Lv. ${item.level} • ${item.realm_reached || "Adventure"}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-black text-amber-400 text-sm md:text-base">${(item.score || 0).toLocaleString()} pts</p>
                            <p class="text-[10px] text-slate-500">${new Date(item.created_at).toLocaleDateString()}</p>
                        </div>
                    `;
                    listEl.appendChild(row);
                });
                return;
            }
        }
        // Fallback to local if cloud empty or offline
        this.renderLeaderboard();
    }

    startSurvival() {
        window.soundManager.playClick();
        this.mode = "survival";
        this.currentRealm = 0;
        this.realmQuestions = [...QUESTIONS_DATABASE].sort(() => Math.random() - 0.5);
        this.qIndex = 0;
        this.lives = 3;
        this.streak = 0;

        if (this.elRealmTitle) this.elRealmTitle.textContent = "Survival Arena";
        if (this.elRealmIcon) this.elRealmIcon.textContent = "🔥";

        this.closeAllModals();
        this.showScreen("screen-game");
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.qIndex >= this.realmQuestions.length) {
            if (this.mode === "adventure") {
                this.handleRealmComplete();
            } else {
                // In survival, reshuffle and continue endless
                this.realmQuestions = [...QUESTIONS_DATABASE].sort(() => Math.random() - 0.5);
                this.qIndex = 0;
                this.loadQuestion();
            }
            return;
        }

        this.isAnswered = false;
        this.currentQ = this.realmQuestions[this.qIndex];

        // Update question counter
        if (this.elQuestionCounter) {
            if (this.mode === "adventure") {
                this.elQuestionCounter.textContent = `Quest ${this.qIndex + 1} of ${this.realmQuestions.length}`;
            } else {
                this.elQuestionCounter.textContent = `Wave ${this.qIndex + 1}`;
            }
        }

        if (this.elQuestionCategory) {
            this.elQuestionCategory.textContent = this.currentQ.category;
        }

        if (this.elQuestionText) {
            this.elQuestionText.textContent = this.currentQ.question;
        }

        if (this.elQuestionClue) {
            this.elQuestionClue.textContent = this.currentQ.clue;
        }

        // Render shuffled options
        if (this.elOptionsGrid) {
            this.elOptionsGrid.innerHTML = "";
            const options = this.currentQ.options.map((opt, i) => ({ text: opt, originalIndex: i }));
            
            options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.className = "option-card group relative p-4 md:p-5 rounded-2xl bg-slate-800/90 hover:bg-indigo-900/60 border border-slate-700/80 hover:border-indigo-400/80 text-left transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/20 focus:outline-none focus:ring-2 focus:ring-indigo-400";
                
                const keyLetter = ["A", "B", "C", "D"][idx] || (idx + 1);
                btn.innerHTML = `
                    <div class="flex items-center gap-3.5">
                        <span class="option-key flex-shrink-0 w-8 h-8 rounded-xl bg-slate-700/80 group-hover:bg-indigo-600 text-slate-200 group-hover:text-white font-bold flex items-center justify-center text-sm border border-slate-600 transition-colors">
                            ${keyLetter}
                        </span>
                        <span class="option-text text-slate-100 font-semibold text-base md:text-lg flex-1">
                            ${opt.text}
                        </span>
                    </div>
                `;
                btn.addEventListener("click", () => this.selectOption(opt.originalIndex, btn));
                this.elOptionsGrid.appendChild(btn);
            });
        }

        // Auto speak question if speech is enabled
        if (window.speechManager && window.speechManager.enabled) {
            window.speechManager.speak(this.currentQ.question);
        }

        this.startTimer();
    }

    startTimer() {
        this.stopTimer();
        this.timeLeft = this.maxTime;
        this.updateTimerDisplay();

        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.handleTimeout();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    updateTimerDisplay() {
        if (this.elTimer) {
            this.elTimer.textContent = this.timeLeft;
        }
        if (this.elTimerBar) {
            const pct = (this.timeLeft / this.maxTime) * 100;
            this.elTimerBar.style.width = `${pct}%`;

            if (this.timeLeft <= 5) {
                this.elTimerBar.className = "h-full bg-rose-500 transition-all duration-300";
                window.soundManager.playTone(400, 0.05, "sine", 0.05);
            } else if (this.timeLeft <= 10) {
                this.elTimerBar.className = "h-full bg-amber-500 transition-all duration-300";
            } else {
                this.elTimerBar.className = "h-full bg-emerald-500 transition-all duration-300";
            }
        }
    }

    selectOption(selectedIndex, btnElement) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        this.stopTimer();

        const isCorrect = selectedIndex === this.currentQ.correct;

        // Visual feedback on clicked button
        if (btnElement) {
            if (isCorrect) {
                btnElement.classList.add("bg-emerald-600/90", "border-emerald-400", "ring-2", "ring-emerald-400");
            } else {
                btnElement.classList.add("bg-rose-600/90", "border-rose-400", "ring-2", "ring-rose-400");
            }
        }

        if (isCorrect) {
            this.handleCorrect();
        } else {
            this.handleWrong(selectedIndex);
        }
    }

    handleTimeout() {
        if (this.isAnswered) return;
        this.isAnswered = true;
        this.handleWrong(-1, true);
    }

    handleCorrect() {
        window.soundManager.playCorrect();

        // Calculate score & XP with speed and streak multiplier
        const baseScore = 100;
        const speedBonus = this.timeLeft * 5; // up to +100 bonus
        this.streak++;
        if (this.streak > this.bestStreak) this.bestStreak = this.streak;

        const streakMultiplier = 1 + Math.min(this.streak * 0.2, 1.0); // up to 2x multiplier
        const totalPoints = Math.round((baseScore + speedBonus) * streakMultiplier);
        const earnedXP = 30 + Math.round(this.timeLeft * 1.5);

        this.score += totalPoints;
        this.addXP(earnedXP);

        // Check achievements
        this.checkAchievements("answer_correct");
        if (this.timeLeft >= 12) this.checkAchievements("speed");
        if (this.streak >= 5) this.checkAchievements("combo_5");

        this.updateHUD();
        this.showFeedback(true, totalPoints, earnedXP);
    }

    handleWrong(selectedIndex, isTimeout = false) {
        window.soundManager.playWrong();
        this.lives--;
        this.streak = 0;
        this.updateHUD();

        if (this.lives <= 0) {
            this.showGameOver(isTimeout ? "Waktu Habis!" : "Jawaban Kurang Tepat");
        } else {
            this.showFeedback(false, 0, 0, isTimeout);
        }
    }

    addXP(amount) {
        this.xp += amount;
        const xpNeededForNext = this.getXPForLevel(this.level);

        if (this.xp >= xpNeededForNext) {
            this.level++;
            window.soundManager.playLevelUp();
            this.triggerConfetti();
            this.showLevelUpNotification(this.level);
            if (this.level >= 5) this.checkAchievements("level_5");
        }
        if (this.xp >= 1000) this.checkAchievements("xp_1000");
    }

    getXPForLevel(lvl) {
        return lvl * 150;
    }

    updateHUD() {
        if (this.elScore) this.elScore.textContent = this.score.toLocaleString();
        if (this.elXp) this.elXp.textContent = `${this.xp} XP`;
        if (this.elLevel) this.elLevel.textContent = `Lv. ${this.level}`;
        if (this.elLevelTitle) {
            const titleIdx = Math.min(this.level - 1, this.levelTitles.length - 1);
            this.elLevelTitle.textContent = this.levelTitles[titleIdx];
        }

        // XP Bar
        if (this.elXpBar) {
            const currentLevelMin = (this.level - 1) * 150;
            const currentLevelMax = this.level * 150;
            const progress = Math.max(0, Math.min(100, ((this.xp - currentLevelMin) / (currentLevelMax - currentLevelMin)) * 100));
            this.elXpBar.style.width = `${progress}%`;
        }

        // Lives (Hearts)
        if (this.elLives) {
            let hearts = "";
            for (let i = 0; i < this.maxLives; i++) {
                if (i < this.lives) {
                    hearts += `<span class="inline-block text-rose-500 animate-pulse text-lg md:text-xl">❤️</span>`;
                } else {
                    hearts += `<span class="inline-block text-slate-600 text-lg md:text-xl">🖤</span>`;
                }
            }
            this.elLives.innerHTML = hearts;
        }

        // Combo Streak
        if (this.elStreak) {
            if (this.streak >= 2) {
                this.elStreak.classList.remove("hidden");
                this.elStreak.innerHTML = `🔥 ${this.streak}x Combo!`;
            } else {
                this.elStreak.classList.add("hidden");
            }
        }
    }

    showFeedback(isCorrect, points = 0, xpEarned = 0, isTimeout = false) {
        if (!this.elFeedbackModal) return;

        const q = this.currentQ;
        const correctAnsText = q.options[q.correct];

        if (isCorrect) {
            this.elFeedbackTitle.textContent = "Awesome! Jawaban Benar!";
            this.elFeedbackTitle.className = "text-xl md:text-2xl font-black text-emerald-400";
            this.elFeedbackIcon.textContent = "🎉";
            this.elFeedbackBody.innerHTML = `
                <div class="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200">
                    <p class="font-bold text-lg text-emerald-300">✓ ${correctAnsText}</p>
                    <div class="mt-2 flex gap-4 text-xs font-mono">
                        <span class="text-amber-300">+${points} Skor</span>
                        <span class="text-indigo-300">+${xpEarned} XP</span>
                        ${this.streak >= 2 ? `<span class="text-orange-400">${this.streak}x Combo!</span>` : ""}
                    </div>
                </div>
            `;
        } else {
            this.elFeedbackTitle.textContent = isTimeout ? "Waktu Habis!" : "Kurang Tepat, Jangan Menyerah!";
            this.elFeedbackTitle.className = "text-xl md:text-2xl font-black text-rose-400";
            this.elFeedbackIcon.textContent = isTimeout ? "⏳" : "💡";
            this.elFeedbackBody.innerHTML = `
                <div class="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200">
                    <p class="text-xs uppercase tracking-wide text-rose-300 font-bold">Kunci Jawaban yang Benar:</p>
                    <p class="font-bold text-lg text-white mt-1">✓ ${correctAnsText}</p>
                </div>
            `;
        }

        // Educational Explanation Box
        if (this.elFeedbackExplanation) {
            this.elFeedbackExplanation.innerHTML = `
                <div class="space-y-3">
                    <div class="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700">
                        <h4 class="text-xs uppercase tracking-wider font-bold text-indigo-400 mb-1 flex items-center justify-between">
                            <span>📖 Penjelasan Materi Pembelajaran:</span>
                            <button id="fb-speech-btn" class="px-2 py-0.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs font-normal flex items-center gap-1 transition-colors">
                                🔊 Dengarkan Audio
                            </button>
                        </h4>
                        <p class="text-slate-200 text-sm leading-relaxed">${q.explanation}</p>
                    </div>
                </div>
            `;

            // Bind speech button
            const speechBtn = document.getElementById("fb-speech-btn");
            if (speechBtn && window.speechManager) {
                speechBtn.addEventListener("click", () => {
                    window.speechManager.speak(q.pronounce || correctAnsText);
                });
            }
        }

        this.elFeedbackModal.classList.remove("hidden");
        this.elFeedbackModal.classList.add("flex");
    }

    nextQuestion() {
        window.soundManager.playClick();
        if (this.elFeedbackModal) {
            this.elFeedbackModal.classList.add("hidden");
            this.elFeedbackModal.classList.remove("flex");
        }
        this.qIndex++;
        this.loadQuestion();
    }

    handleRealmComplete() {
        window.soundManager.playBadgeUnlock();
        this.triggerConfetti();

        // Unlock next realm
        const nextRealmId = this.currentRealm + 1;
        if (nextRealmId <= 5 && !this.unlockedRealms.includes(nextRealmId)) {
            this.unlockedRealms.push(nextRealmId);
            localStorage.setItem("nq_unlocked_realms", JSON.stringify(this.unlockedRealms));
        }

        if (this.currentRealm === 1) this.checkAchievements("realm1_clear");
        if (this.lives === this.maxLives) this.checkAchievements("no_mistake");
        if (this.currentRealm >= 5) this.checkAchievements("master_archmage");

        // Save highscore
        this.saveScoreToLeaderboard();

        // Show Victory Modal
        if (this.elVictoryModal) {
            const vTitle = document.getElementById("vic-title");
            const vDesc = document.getElementById("vic-desc");
            const vRealm = REALMS_DATA.find(r => r.id === this.currentRealm);

            if (vTitle) vTitle.textContent = `${vRealm.icon} ${vRealm.title} Cleared!`;
            if (vDesc) vDesc.textContent = `Luar biasa! Kamu telah menaklukkan tantangan di ${vRealm.title}. Skor totalmu saat ini: ${this.score.toLocaleString()} Poin!`;

            this.elVictoryModal.classList.remove("hidden");
            this.elVictoryModal.classList.add("flex");
        }
    }

    showGameOver(reason) {
        window.soundManager.playGameOver();
        this.saveScoreToLeaderboard();

        if (this.elGameOverModal) {
            const goReason = document.getElementById("go-reason");
            const goScore = document.getElementById("go-score");
            const goLvl = document.getElementById("go-level");

            if (goReason) goReason.textContent = reason;
            if (goScore) goScore.textContent = this.score.toLocaleString();
            if (goLvl) goLvl.textContent = `Level ${this.level} (${this.levelTitles[Math.min(this.level - 1, 9)]})`;

            this.elGameOverModal.classList.remove("hidden");
            this.elGameOverModal.classList.add("flex");
        }
    }

    checkAchievements(type) {
        ACHIEVEMENTS_DATA.forEach(ach => {
            if (this.unlockedAchievements.includes(ach.id)) return;

            let shouldUnlock = false;
            if (ach.id === "first_blood" && type === "answer_correct") shouldUnlock = true;
            if (ach.id === "speed_demon" && type === "speed") shouldUnlock = true;
            if (ach.id === "combo_5" && type === "combo_5") shouldUnlock = true;
            if (ach.id === "realm1_clear" && type === "realm1_clear") shouldUnlock = true;
            if (ach.id === "level_5" && type === "level_5") shouldUnlock = true;
            if (ach.id === "no_mistake" && type === "no_mistake") shouldUnlock = true;
            if (ach.id === "xp_1000" && type === "xp_1000") shouldUnlock = true;
            if (ach.id === "master_archmage" && type === "master_archmage") shouldUnlock = true;

            if (shouldUnlock) {
                this.unlockAchievement(ach);
            }
        });
    }

    unlockAchievement(ach) {
        if (this.unlockedAchievements.includes(ach.id)) return;
        this.unlockedAchievements.push(ach.id);
        localStorage.setItem("nq_achievements", JSON.stringify(this.unlockedAchievements));

        window.soundManager.playBadgeUnlock();
        this.renderAchievements();

        // Toast notification
        this.showToast(`🏆 Badge Unlocked: ${ach.title}!`, ach.desc);
    }

    showToast(title, body) {
        const toast = document.createElement("div");
        toast.className = "fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 border border-amber-500/80 text-white shadow-2xl shadow-amber-500/20 transform transition-all duration-300 translate-y-10 opacity-0";
        toast.innerHTML = `
            <div class="text-2xl">✨</div>
            <div>
                <p class="font-bold text-amber-300 text-sm">${title}</p>
                <p class="text-xs text-slate-300">${body}</p>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove("translate-y-10", "opacity-0");
        }, 50);

        setTimeout(() => {
            toast.classList.add("translate-y-10", "opacity-0");
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    showLevelUpNotification(lvl) {
        const title = this.levelTitles[Math.min(lvl - 1, 9)];
        this.showToast(`⚔️ Level Up! Level ${lvl}`, `Gelar baru: ${title}!`);
    }

    saveScoreToLeaderboard() {
        if (this.score <= 0) return;
        const realmName = this.mode === "survival" ? "Survival" : (this.mode === "multiplayer" ? "Multiplayer Duel" : (REALMS_DATA.find(r => r.id === this.currentRealm)?.title || "Isle"));
        const entry = {
            name: this.playerName,
            score: this.score,
            level: this.level,
            realm: realmName,
            date: new Date().toISOString().split("T")[0]
        };

        this.leaderboard.push(entry);
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10); // Keep top 10
        localStorage.setItem("nq_leaderboard", JSON.stringify(this.leaderboard));

        // Save to Supabase Cloud Leaderboard
        if (window.multiplayerManager) {
            window.multiplayerManager.saveGlobalScore(this.playerName, this.score, this.level, 100, realmName);
        }

        this.renderLeaderboard();
    }

    renderLeaderboard() {
        const listEl = document.getElementById("leaderboard-list");
        if (!listEl) return;

        listEl.innerHTML = "";
        this.leaderboard.forEach((item, idx) => {
            const rankIcon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`;
            const row = document.createElement("div");
            row.className = `flex items-center justify-between p-3 rounded-xl border ${idx === 0 ? "bg-amber-950/40 border-amber-500/50" : "bg-slate-800/60 border-slate-700/60"}`;
            row.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="w-7 text-center font-bold ${idx < 3 ? "text-base" : "text-slate-400 text-sm"}">${rankIcon}</span>
                    <div>
                        <p class="font-bold text-slate-100 text-sm md:text-base">${item.name}</p>
                        <p class="text-xs text-slate-400">Lv. ${item.level} • ${item.realm}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-black text-amber-400 text-sm md:text-base">${item.score.toLocaleString()} pts</p>
                    <p class="text-[10px] text-slate-500">${item.date}</p>
                </div>
            `;
            listEl.appendChild(row);
        });
    }

    renderAchievements() {
        const grid = document.getElementById("achievements-grid");
        if (!grid) return;

        grid.innerHTML = "";
        ACHIEVEMENTS_DATA.forEach(ach => {
            const isUnlocked = this.unlockedAchievements.includes(ach.id);
            const card = document.createElement("div");
            card.className = `p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                isUnlocked
                    ? "bg-slate-800/90 border-amber-500/60 shadow-lg shadow-amber-500/10"
                    : "bg-slate-900/60 border-slate-800/80 opacity-60 grayscale"
            }`;
            card.innerHTML = `
                <span class="text-2xl md:text-3xl p-2 rounded-xl bg-slate-700/50 flex-shrink-0">${ach.icon}</span>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                        <p class="font-bold text-sm ${isUnlocked ? "text-amber-300" : "text-slate-400"} truncate">${ach.title}</p>
                        ${isUnlocked ? '<span class="text-xs text-emerald-400 font-bold">✓</span>' : '🔒'}
                    </div>
                    <p class="text-xs text-slate-400 mt-0.5 leading-snug">${ach.desc}</p>
                </div>
            `;
            grid.appendChild(card);
        });

        // Update count badge
        const countBadge = document.getElementById("hud-badge-count");
        if (countBadge) {
            countBadge.textContent = `${this.unlockedAchievements.length}/${ACHIEVEMENTS_DATA.length}`;
        }
    }

    renderMap() {
        const mapContainer = document.getElementById("map-realms-container");
        if (!mapContainer) return;

        mapContainer.innerHTML = "";
        REALMS_DATA.forEach(realm => {
            const isUnlocked = this.unlockedRealms.includes(realm.id);
            const card = document.createElement("div");
            card.className = `p-4 md:p-5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                isUnlocked
                    ? "bg-slate-800/90 border-indigo-500/60 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20 cursor-pointer"
                    : "bg-slate-900/60 border-slate-800 opacity-60 cursor-not-allowed"
            }`;

            card.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex items-center gap-3">
                        <span class="text-3xl md:text-4xl p-2 rounded-xl bg-slate-700/60">${realm.icon}</span>
                        <div>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Realm 0${realm.id}</span>
                            <h3 class="text-base md:text-lg font-bold text-white">${realm.title}</h3>
                            <p class="text-xs text-slate-300">${realm.subtitle}</p>
                        </div>
                    </div>
                    <div>
                        ${isUnlocked ? '<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Open</span>' : '<span class="text-slate-500">🔒 Locked</span>'}
                    </div>
                </div>
                <p class="text-xs text-slate-400 mt-3 leading-relaxed">${realm.description}</p>
            `;

            if (isUnlocked) {
                card.addEventListener("click", () => {
                    this.startAdventure(realm.id);
                });
            }

            mapContainer.appendChild(card);
        });
    }

    triggerConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#eab308"];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.5) * 16 - 3,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.02 + 0.01
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activeCount = 0;

            particles.forEach(p => {
                if (p.alpha > 0) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.2; // gravity
                    p.alpha -= p.decay;

                    ctx.save();
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                    ctx.restore();
                    activeCount++;
                }
            });

            if (activeCount > 0) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        animate();
    }

    showScreen(screenId) {
        ["screen-home", "screen-game"].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (id === screenId) {
                    el.classList.remove("hidden");
                } else {
                    el.classList.add("hidden");
                }
            }
        });
    }

    closeAllModals() {
        [
            this.elFeedbackModal,
            this.elGameOverModal,
            this.elVictoryModal,
            this.elMapModal,
            this.elLeaderboardModal,
            this.elAchievementsModal
        ].forEach(m => {
            if (m) {
                m.classList.add("hidden");
                m.classList.remove("flex");
            }
        });
    }
}

// Global initialization on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    window.game = new NumberQuestGame();

    // Bind Home screen buttons
    const btnPlayAdventure = document.getElementById("btn-play-adventure");
    if (btnPlayAdventure) {
        btnPlayAdventure.addEventListener("click", () => {
            const mapModal = document.getElementById("map-modal");
            if (mapModal) {
                mapModal.classList.remove("hidden");
                mapModal.classList.add("flex");
            }
        });
    }

    const btnPlaySurvival = document.getElementById("btn-play-survival");
    if (btnPlaySurvival) {
        btnPlaySurvival.addEventListener("click", () => {
            window.game.startSurvival();
        });
    }

    // Leaderboard button
    const btnOpenLeaderboard = document.getElementById("btn-open-leaderboard");
    if (btnOpenLeaderboard) {
        btnOpenLeaderboard.addEventListener("click", () => {
            const m = document.getElementById("leaderboard-modal");
            if (m) {
                m.classList.remove("hidden");
                m.classList.add("flex");
            }
        });
    }

    // Badges / Achievements button
    const btnOpenBadges = document.getElementById("btn-open-badges");
    if (btnOpenBadges) {
        btnOpenBadges.addEventListener("click", () => {
            const m = document.getElementById("achievements-modal");
            if (m) {
                m.classList.remove("hidden");
                m.classList.add("flex");
            }
        });
    }

    // Modal Close buttons
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            window.soundManager.playClick();
            window.game.closeAllModals();
        });
    });

    // Feedback Next Question button
    const fbNextBtn = document.getElementById("fb-next-btn");
    if (fbNextBtn) {
        fbNextBtn.addEventListener("click", () => {
            window.game.nextQuestion();
        });
    }

    // Question Audio Pronounce button in Game Arena
    const btnQuestionAudio = document.getElementById("btn-question-audio");
    if (btnQuestionAudio) {
        btnQuestionAudio.addEventListener("click", () => {
            if (window.game.currentQ && window.speechManager) {
                window.speechManager.speak(window.game.currentQ.question);
            }
        });
    }

    // Quit to Home button
    const btnQuitGame = document.getElementById("btn-quit-game");
    if (btnQuitGame) {
        btnQuitGame.addEventListener("click", () => {
            window.soundManager.playClick();
            window.game.stopTimer();
            window.game.showScreen("screen-home");
        });
    }

    // Retry button on Game Over
    const btnRetry = document.getElementById("btn-retry-game");
    if (btnRetry) {
        btnRetry.addEventListener("click", () => {
            window.soundManager.playClick();
            window.game.closeAllModals();
            if (window.game.mode === "survival") {
                window.game.startSurvival();
            } else {
                window.game.startAdventure(window.game.currentRealm || 1);
            }
        });
    }

    // Victory Continue button
    const btnVictoryNext = document.getElementById("btn-victory-next");
    if (btnVictoryNext) {
        btnVictoryNext.addEventListener("click", () => {
            window.soundManager.playClick();
            window.game.closeAllModals();
            const nextRealm = (window.game.currentRealm || 1) + 1;
            if (nextRealm <= 5) {
                window.game.startAdventure(nextRealm);
            } else {
                window.game.showScreen("screen-home");
            }
        });
    }


    // Multiplayer Card button in Home
    const btnPlayMultiplayer = document.getElementById("btn-play-multiplayer");
    if (btnPlayMultiplayer) {
        btnPlayMultiplayer.addEventListener("click", () => {
            if (window.multiplayerManager) window.multiplayerManager.openModal();
        });
    }

    // Leaderboard Tabs (Cloud vs Local)
    const tabLbCloud = document.getElementById("tab-lb-cloud");
    const tabLbLocal = document.getElementById("tab-lb-local");
    if (tabLbCloud && tabLbLocal) {
        tabLbCloud.addEventListener("click", () => {
            tabLbCloud.className = "flex-1 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5";
            tabLbLocal.className = "flex-1 py-1.5 rounded-lg text-slate-400 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5";
            if (window.game) window.game.loadCloudLeaderboard();
        });

        tabLbLocal.addEventListener("click", () => {
            tabLbLocal.className = "flex-1 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5";
            tabLbCloud.className = "flex-1 py-1.5 rounded-lg text-slate-400 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5";
            if (window.game) window.game.renderLeaderboard();
        });
    }

    // Sound toggle button
    const btnToggleSound = document.getElementById("btn-toggle-sound");
    if (btnToggleSound) {
        btnToggleSound.addEventListener("click", () => {
            const isMuted = window.soundManager.toggleMute();
            btnToggleSound.innerHTML = isMuted ? "🔇" : "🔊";
        });
    }

    // Player name edit
    const btnEditName = document.getElementById("btn-edit-name");
    if (btnEditName) {
        btnEditName.addEventListener("click", () => {
            const current = window.game.playerName;
            const newName = prompt("Masukkan nama petualangmu (maks 15 karakter):", current);
            if (newName) {
                window.game.setPlayerName(newName);
            }
        });
    }

    // Keyboard shortcuts (1, 2, 3, 4 for options, Space for next)
    window.addEventListener("keydown", (e) => {
        // Space to advance feedback
        if (e.code === "Space") {
            const fbModal = document.getElementById("feedback-modal");
            if (fbModal && !fbModal.classList.contains("hidden")) {
                e.preventDefault();
                window.game.nextQuestion();
                return;
            }
        }

        // Keys 1, 2, 3, 4
        if (["1", "2", "3", "4"].includes(e.key)) {
            const optIdx = parseInt(e.key) - 1;
            const buttons = document.querySelectorAll("#options-grid button");
            if (buttons[optIdx] && !window.game.isAnswered) {
                buttons[optIdx].click();
            }
        }
    });
});
