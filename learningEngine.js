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
        if (this.state.player) {
            this.state.player.volume = 1.0; // Clear masking states safely
        }
    },

    playSegment: function(src, bounds, onSegmentEnd, lineWindows = null, chosenStep = "step2", focusMode = "both") {
        this.stopMonitor();
        const p = this.state.player;
        
        if (!p) return;

        p.volume = 1.0;

        if (p.src.indexOf(src) === -1) {
            p.src = src;
            p.load();
        }

        if (bounds) {
            // Mobile Guard: Validate bounding data numbers to eliminate "non-finite double value" TypeErrors
            const startTime = (bounds && typeof bounds.start === 'number' && isFinite(bounds.start)) ? bounds.start : 0;
            const endTime = (bounds && typeof bounds.end === 'number' && isFinite(bounds.end)) ? bounds.end : p.duration || 0;

            p.currentTime = startTime;
            
            this.state.monitorInterval = setInterval(() => {
                // Safety protection layer if endTime hasn't completely parsed yet
                if (endTime > 0 && p.currentTime >= endTime) {
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
                        // Fallback handling if playhead transitions through an unmapped space gap
                        if (lineWindows.length >= 2) {
                            const splitTime = lineWindows[1][1];
                            if (focusMode === "munnadi") {
                                p.volume = (currentTime <= splitTime) ? 1.0 : 0.0;
                            } else if (focusMode === "pinnadi") {
                                p.volume = (currentTime >= splitTime) ? 1.0 : 0.0;
                            }
                        } else {
                            p.volume = 1.0;
                        }
                    }
                }, 25);
            }
        }
        
        // Mobile browsers require a genuine user gesture thread to let audio stream seamlessly
        p.play().catch(err => console.warn("Audio context engagement deferred until gesture input:", err));
    },

    handleTrackEnded: function() {
        window.dispatchEvent(new CustomEvent('learning-track-ended'));
    }
};
window.LearningEngine = LearningEngine;
