// ============================================================
// NumberQuest Speech Engine (Web Speech API)
// Native English Text-To-Speech for listening & pronunciation
// ============================================================

class SpeechManager {
    constructor() {
        this.synth = window.speechSynthesis || null;
        this.voice = null;
        this.enabled = true;
        this.init();
    }

    init() {
        if (!this.synth) return;

        const setVoice = () => {
            const voices = this.synth.getVoices();
            // Prefer US or UK English
            this.voice = voices.find(v => v.lang.startsWith("en-US")) ||
                         voices.find(v => v.lang.startsWith("en-GB")) ||
                         voices.find(v => v.lang.startsWith("en")) || null;
        };

        setVoice();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = setVoice;
        }
    }

    speak(text, rate = 0.9) {
        if (!this.synth || !this.enabled || !text) return;

        // Cancel previous pending speech
        this.synth.cancel();

        const cleanText = text.replace(/[*_#]/g, "").trim();
        const utter = new SpeechSynthesisUtterance(cleanText);
        if (this.voice) {
            utter.voice = this.voice;
        }
        utter.lang = "en-US";
        utter.rate = rate; // slightly slower for clear educational understanding
        utter.pitch = 1.0;

        this.synth.speak(utter);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) this.stop();
        return this.enabled;
    }
}

window.speechManager = new SpeechManager();
