/**
 * learningEngine.js - Handles playback logic and state
 */
const LearningEngine = {
    state: {
        currentRepeatCount: 0,
        monitorInterval: null,
        player: null
    },

    init: function(playerElement) {
        this.state.player = playerElement;
        this.state.player.onended = () => this.handleTrackEnded();
    },

    stopMonitor: function() {
        if (this.state.monitorInterval) clearInterval(this.state.monitorInterval);
        this.state.monitorInterval = null;
    },

    playSegment: function(src, bounds, onSegmentEnd) {
        this.stopMonitor();
        const p = this.state.player;
        
        if (p.src.indexOf(src) === -1) {
            p.src = src;
            p.load();
        }

        if (bounds) {
            p.currentTime = bounds.start;
            this.state.monitorInterval = setInterval(() => {
                if (p.currentTime >= bounds.end) {
                    p.pause();
                    this.stopMonitor();
                    onSegmentEnd();
                }
            }, 30);
        }
        p.play();
    },

    handleTrackEnded: function() {
        // Dispatches event so the UI can decide what to do next
        window.dispatchEvent(new CustomEvent('learning-track-ended'));
    }
};
window.LearningEngine = LearningEngine;
