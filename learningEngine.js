/**
 * learningEngine.js - Handles playback logic, state, and real-time volume masking
 */
const LearningEngine = {
    state: {
        currentRepeatCount: 0,
        monitorInterval: null,
        player: null,
        volumeMaskInterval: null
    },

    init: function(playerElement) {
        this.state.player = playerElement;
        this.state.player.onended = () => this.handleTrackEnded();
    },

    stopMonitor: function() {
        if (this.state.monitorInterval) clearInterval(this.state.monitorInterval);
        if (this.state.volumeMaskInterval) clearInterval(this.state.volumeMaskInterval);
        this.state.monitorInterval = null;
        this.state.volumeMaskInterval = null;
        if (this.state.player) this.state.player.volume = 1.0; // Reset volume safely
    },

    playSegment: function(src, bounds, onSegmentEnd, halfLineWindows = null, focusMode = "both") {
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

            // Real-time Volume Masking Engine for Munnadi / Pinnadi
            if (halfLineWindows && halfLineWindows.length > 0 && focusMode !== "both") {
                this.state.volumeMaskInterval = setInterval(() => {
                    const currentTime = p.currentTime;
                    let isMunnadi = false;

                    // Determine if the current playhead is within an odd or even half-line boundary segment
                    for (let i = 0; i < halfLineWindows.length; i++) {
                        const start = halfLineWindows[i][0];
                        const end = halfLineWindows[i][1];
                        if (currentTime >= start && currentTime < end) {
                            // Odd indices (0, 2, 4...) represent Munnadi chunks; even represent Pinnadi chunks
                            isMunnadi = (i % 2 === 0);
                            break;
                        }
                    }

                    // Apply dynamic muting logic based on selection
                    if (focusMode === "munnadi") {
                        p.volume = isMunnadi ? 1.0 : 0.0; // Mute Pinnadi sections
                    } else if (focusMode === "pinnadi") {
                        p.volume = isMunnadi ? 0.0 : 1.0; // Mute Munnadi sections
                    }
                }, 50); // High-frequency checks for tight switching transitions
            }
        }
        p.play();
    },

    handleTrackEnded: function() {
        window.dispatchEvent(new CustomEvent('learning-track-ended'));
    }
};
window.LearningEngine = LearningEngine;
