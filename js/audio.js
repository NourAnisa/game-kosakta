// ============================================================
// NumberQuest Sound Synthesizer (Web Audio API)
// No external audio files needed - runs 100% offline & instant
// ============================================================

class SoundManager {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.init();
    }

    init() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        } catch (e) {
            console.warn("Web Audio not supported", e);
        }
    }

    ensureContext() {
        if (!this.ctx) {
            this.init();
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    playTone(freq, duration = 0.1, type = "sine", gainVal = 0.15) {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // gracefully ignore audio glitch
        }
    }

    playClick() {
        this.playTone(800, 0.05, "triangle", 0.08);
    }

    playCorrect() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major triad)
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 0.18, "sine", 0.12);
            }, idx * 60);
        });
    }

    playWrong() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [311.13, 277.18]; // Eb4 down to Db4
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 0.22, "sawtooth", 0.1);
            }, idx * 100);
        });
    }

    playLevelUp() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const fanfare = [
            { f: 523.25, d: 0.1 }, // C5
            { f: 659.25, d: 0.1 }, // E5
            { f: 783.99, d: 0.1 }, // G5
            { f: 1046.50, d: 0.3 }, // C6
            { f: 1318.51, d: 0.4 }  // E6
        ];
        fanfare.forEach((n, idx) => {
            setTimeout(() => {
                this.playTone(n.f, n.d, "triangle", 0.18);
            }, idx * 90);
        });
    }

    playBadgeUnlock() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [659.25, 880, 1174.66, 1760]; // E5, A5, D6, A6
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 0.25, "sine", 0.15);
            }, idx * 75);
        });
    }

    playGameOver() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [440, 415.3, 392, 349.23]; // A4 -> Ab4 -> G4 -> F4
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 0.35, "sawtooth", 0.12);
            }, idx * 140);
        });
    }
}

window.soundManager = new SoundManager();
