/**
 * learningEngine.js - Handles playback logic, state, and index-based line muting
 */
const LearningEngine = {
    state: {
        currentRepeatCount: 0,
        monitorInterval: null,
        player: null,
        volumeInterval: null
    },

    init: function(playerElement) {
        this.state.player = playerElement;
        this.state.player.onended = () => this.handleTrackEnded();
    },

    stopMonitor: function() {
        if (this.state.monitorInterval) clearInterval(this.state.monitorInterval);
        if (this.state.volumeInterval) clearInterval(this.state.volumeInterval);
        this.state.monitorInterval = null;
        this.state.volumeInterval = null;
        if (this.state.player) this.state.player.volume = 1.0; // Clear masking states safely
    },

    // Extension wrapper built on top of your original signature loop to parse runtime rules
    playSegment: function(src, bounds, onSegmentEnd, lineWindows = null, chosenStep = "step2", focusMode = "both") {
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

            // STRICT ISOLATION: Volume rules apply ONLY during Step 4 (Full Pasuram Practice)
            if (chosenStep === "step4" && lineWindows && lineWindows.length > 0 && focusMode !== "both") {
                this.state.volumeInterval = setInterval(() => {
                    const currentTime = p.currentTime;
                    let activeLineIdx = -1;

                    // Match current time location against full-line arrays to find active segment row
                    for (let i = 0; i < lineWindows.length; i++) {
                        if (currentTime >= lineWindows[i][0] && currentTime < lineWindows[i][1]) {
                            activeLineIdx = i;
                            break;
                        }
                    }

                    if (activeLineIdx !== -1) {
                        if (focusMode === "munnadi") {
                            // MUNNADI: Play first 2 segments (idx 0,1); Mute last 2 segments (idx 2,3)
                            p.volume = (activeLineIdx < 2) ? 1.0 : 0.0;
                        } else if (focusMode === "pinnadi") {
                            // PINNADI: Mute first 2 segments (idx 0,1); Play last 2 segments (idx 2,3)
                            p.volume = (activeLineIdx >= 2) ? 1.0 : 0.0;
                        }
                    } else {
                        // Fallback fallback rule handling if playhead transitions through an unmapped space gap
                        p.volume = 1.0;
                    }
                }, 40); // Rapid sampling frequency ensures immediate line-mute cutting
            }
        }
        p.play();
    },

    handleTrackEnded: function() {
        window.dispatchEvent(new CustomEvent('learning-track-ended'));
    }
};
window.LearningEngine = LearningEngine;
