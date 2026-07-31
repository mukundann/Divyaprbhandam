/**
 * playerEngine.js - UI Syncing, Dynamic Pickers, and Navigation logic
 */

let activeLineIndex = 0;
let pauseTimeoutHandle = null;

/**
 * Parses user selection string into structured coordinate components.
 */
function parseCoords(str, hasSub) {
    if (!str) return { ch: '1', sub: '1', pas: '1' };
    const parts = String(str).split('.');
    if (hasSub) {
        return {
            ch: parts[0] || '1',
            sub: parts[1] || '1',
            pas: parts[2] || '1'
        };
    } else {
        return {
            ch: parts.length > 1 ? parts[0] : '1',
            sub: '1',
            pas: parts.length > 1 ? parts[1] : parts[0] || '1'
        };
    }
}

/**
 * Fills a <select> element with options.
 */
function fillSelectOptions(selectEl, optionsArray) {
    if (!selectEl) return;
    selectEl.innerHTML = '';
    optionsArray.forEach(opt => {
        const el = document.createElement('option');
        el.value = opt.value;
        el.textContent = opt.label;
        selectEl.appendChild(el);
    });
}

/**
 * Safely computes or falls back to standard pasuram limits.
 */
function sectionPasuramCountSafe(pre, section) {
    const c = CONFIG[pre];
    if (!c) return 10;
    if (c.ex && c.ex[section]) return c.ex[section];
    return c.defPas || 10;
}

/**
 * Rebuilds picker visibility and input modes (Select vs Text Input) based on `customTextLevels`.
 */
function rebuildPasuramPickers(preferredValue) {
    const prefixEl = document.getElementById('prefix');
    const numberEl = document.getElementById('number');
    if (!prefixEl || !numberEl) return;

    const pre = prefixEl.value;
    const c = CONFIG[pre];
    if (!c) return;

    const customLevels = c.customTextLevels || [];
    const isChCustom = customLevels.includes('chapter');
    const isSubCustom = customLevels.includes('sub');
    const isPasCustom = customLevels.includes('pasuram');

    const preferred = preferredValue != null ? String(preferredValue).trim() : (numberEl.value || '');
    const coords = parseCoords(preferred || '1.1', c.hasSub);

    // Dynamic Element References
    const partEl = document.getElementById('pasPart');
    const partCustomEl = document.getElementById('pasPartCustom');
    const subEl = document.getElementById('pasSub');
    const subCustomEl = document.getElementById('pasSubCustom');
    const verseEl = document.getElementById('pasVerse');
    const verseCustomEl = document.getElementById('pasVerseCustom');
    const groupSub = document.getElementById('groupSub');

    // -------------------------------------------------------------------
    // 1. CHAPTER LEVEL
    // -------------------------------------------------------------------
    if (isChCustom) {
        if (partEl) partEl.classList.add('hidden');
        if (partCustomEl) {
            partCustomEl.classList.remove('hidden');
            partCustomEl.value = coords.ch || '1';
        }
    } else {
        if (partCustomEl) partCustomEl.classList.add('hidden');
        if (partEl) {
            partEl.classList.remove('hidden');
            const minCh = typeof c.minCh !== 'undefined' ? c.minCh : (c.hasSub ? 1 : 0);
            const maxCh = c.maxCh || 1;
            const parts = [];
            for (let ch = minCh; ch <= maxCh; ch++) {
                parts.push({ value: ch, label: ch === 0 ? 'Taniyan' : String(ch) });
            }
            fillSelectOptions(partEl, parts);
            partEl.value = String(coords.ch || minCh);
        }
    }

    // -------------------------------------------------------------------
    // 2. SUB-CHAPTER LEVEL
    // -------------------------------------------------------------------
    if (c.hasSub) {
        if (groupSub) groupSub.classList.remove('hidden');
        if (isSubCustom) {
            if (subEl) subEl.classList.add('hidden');
            if (subCustomEl) {
                subCustomEl.classList.remove('hidden');
                subCustomEl.value = coords.sub || '1';
            }
        } else {
            if (subCustomEl) subCustomEl.classList.add('hidden');
            if (subEl) {
                subEl.classList.remove('hidden');
                const currentCh = isChCustom ? (partCustomEl ? partCustomEl.value : '1') : (partEl ? partEl.value : '1');
                const maxSub = c.maxSub || 10;

                const subs = [];
                for (let s = 1; s <= maxSub; s++) {
                    subs.push({ value: s, label: String(s) });
                }
                fillSelectOptions(subEl, subs);
                subEl.value = String(coords.sub || 1);
            }
        }
    } else {
        if (groupSub) groupSub.classList.add('hidden');
    }

    // -------------------------------------------------------------------
    // 3. PASURAM LEVEL
    // -------------------------------------------------------------------
    if (isPasCustom) {
        if (verseEl) verseEl.classList.add('hidden');
        if (verseCustomEl) {
            verseCustomEl.classList.remove('hidden');
            verseCustomEl.value = coords.pas || '1';
        }
    } else {
        if (verseCustomEl) verseCustomEl.classList.add('hidden');
        if (verseEl) {
            verseEl.classList.remove('hidden');
            const currentCh = isChCustom ? (partCustomEl ? partCustomEl.value : '1') : (partEl ? partEl.value : '1');
            const currentSub = isSubCustom ? (subCustomEl ? subCustomEl.value : '1') : (subEl ? subEl.value : '1');
            const targetSection = c.hasSub ? `${currentCh}.${currentSub}` : currentCh;

            const n = sectionPasuramCountSafe(pre, targetSection);
            verseEl.min = 1;
            verseEl.max = Math.max(1, n);
            verseEl.value = Math.min(Math.max(parseInt(coords.pas, 10) || 1, 1), n);
        }
    }

    syncNumberFromPickers();
}

/**
 * Combines standard selects or custom text fields into `#number`.
 */
function syncNumberFromPickers() {
    const prefixEl = document.getElementById('prefix');
    const numberEl = document.getElementById('number');
    if (!prefixEl || !numberEl) return;

    const pre = prefixEl.value;
    const c = CONFIG[pre];
    if (!c) return;

    const customLevels = c.customTextLevels || [];
    const isChCustom = customLevels.includes('chapter');
    const isSubCustom = customLevels.includes('sub');
    const isPasCustom = customLevels.includes('pasuram');

    const chVal = isChCustom 
        ? (document.getElementById('pasPartCustom')?.value || '').trim() 
        : (document.getElementById('pasPart')?.value || '1');

    const subVal = isSubCustom 
        ? (document.getElementById('pasSubCustom')?.value || '').trim() 
        : (document.getElementById('pasSub')?.value || '1');

    const pasVal = isPasCustom 
        ? (document.getElementById('pasVerseCustom')?.value || '').trim() 
        : (document.getElementById('pasVerse')?.value || '1');

    let finalPasuramKey = '';

    if (c.hasSub) {
        finalPasuramKey = `${chVal}.${subVal}.${pasVal}`;
    } else if (c.isPlaylist || c.structure === 'flat_pasuram') {
        finalPasuramKey = pasVal;
    } else {
        finalPasuramKey = `${chVal}.${pasVal}`;
    }

    numberEl.value = finalPasuramKey;

    const hintEl = document.getElementById('pasuramHint');
    if (hintEl) {
        hintEl.textContent = `Selected: ${pre} ${finalPasuramKey}`;
    }
}

/**
 * Event listener triggered whenever inputs change.
 */
function onPasuramPickerChange() {
    syncNumberFromPickers();
    resetLineTracking();
    syncUrlToPrefs();
    ensureMarkersForCurrentSelection(() => {
        if (!(window.LearningEngine && LearningEngine.state && LearningEngine.state.isPlaying)) {
            syncTextToAudioTimeline();
        }
    });
}

/**
 * Resets the UI and options when selecting a new book.
 */
function resetToStart() {
    safeStopAudio();
    resetLineTracking();
    
    const pre = document.getElementById('prefix')?.value || '';
    const c = CONFIG[pre];

    let initialValue = "1.1";
    if (c) {
        if (c.hasSub) {
            initialValue = "1.1.1";
        } else if (c.isPlaylist || c.structure === 'flat_pasuram') {
            initialValue = "1";
        } else {
            const minCh = typeof c.minCh !== 'undefined' ? c.minCh : 1;
            initialValue = `${minCh}.1`;
        }
    }

    rebuildPasuramPickers(initialValue);

    const displayPanel = document.getElementById('pasuramDisplay');
    if (displayPanel) {
        displayPanel.dataset.lastSignature = "";
        displayPanel.innerHTML = "<em>Select a file or press start to view pasuram lines...</em>";
    }
    syncUrlToPrefs();
    ensureMarkersForCurrentSelection(() => {
        if (!(window.LearningEngine && LearningEngine.state && LearningEngine.state.isPlaying)) {
            syncTextToAudioTimeline();
        }
    });
}

// ---------------------------------------------------------------------------
// RUNTIME IMPLEMENTATIONS FOR AUDIO & TRACKING INTEGRATION
// ---------------------------------------------------------------------------

/**
 * Safely stops audio playback and clears active timeouts.
 */
function safeStopAudio() {
    if (pauseTimeoutHandle) {
        clearTimeout(pauseTimeoutHandle);
        pauseTimeoutHandle = null;
    }
    if (window.LearningEngine && typeof window.LearningEngine.stop === 'function') {
        window.LearningEngine.stop();
    }
    const audioEl = document.getElementById('audioPlayer') || document.querySelector('audio');
    if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
    }
}

/**
 * Resets tracking states and clears line highlighting.
 */
function resetLineTracking() {
    activeLineIndex = 0;
    const highlightedLines = document.querySelectorAll('.pasuram-line.active, .highlighted');
    highlightedLines.forEach(el => el.classList.remove('active', 'highlighted'));
}

/**
 * Synchronizes selected book and pasuram position to URL search params.
 */
function syncUrlToPrefs() {
    const prefix = document.getElementById('prefix')?.value;
    const number = document.getElementById('number')?.value;
    if (!prefix || !number || !window.history.replaceState) return;

    const url = new URL(window.location.href);
    url.searchParams.set('book', prefix);
    url.searchParams.set('pasuram', number);
    window.history.replaceState({}, '', url.toString());
}

/**
 * Ensures markers and language texts are asynchronously loaded for current picker selection.
 */
function ensureMarkersForCurrentSelection(cb) {
    const pre = document.getElementById('prefix')?.value;
    const num = document.getElementById('number')?.value;
    const lang = document.getElementById('langSelect')?.value || 'en';

    if (typeof window.loadMarkerOnDemand === 'function' && pre && num) {
        window.loadMarkerOnDemand(pre, num, lang, () => {
            if (cb) cb();
        });
    } else {
        if (cb) cb();
    }
}

/**
 * Syncs displayed text lines with the current audio timeline or index state.
 */
function syncTextToAudioTimeline() {
    const pre = document.getElementById('prefix')?.value;
    const num = document.getElementById('number')?.value;
    const displayPanel = document.getElementById('pasuramDisplay');

    if (!pre || !num || !displayPanel) return;

    // Resolve target data key if selecting from custom playlist
    let targetPre = pre;
    let targetNum = num;
    if (CONFIG[pre] && CONFIG[pre].isPlaylist) {
        const item = CONFIG[pre].getItem(num);
        if (item) {
            targetPre = item.book;
            targetNum = item.pasuram;
        }
    }

    const currentSig = `${targetPre}_${targetNum}`;
    if (displayPanel.dataset.lastSignature === currentSig) return;

    const lines = (window.PASURAM_TEXTS && window.PASURAM_TEXTS[targetPre])
        ? window.PASURAM_TEXTS[targetPre][targetNum]
        : null;

    if (lines && Array.isArray(lines)) {
        displayPanel.dataset.lastSignature = currentSig;
        displayPanel.innerHTML = lines
            .map((line, idx) => `<div class="pasuram-line" data-index="${idx}">${line}</div>`)
            .join('');
    }
}

// Global Export Registration
window.onPasuramPickerChange = onPasuramPickerChange;
window.resetToStart = resetToStart;
window.rebuildPasuramPickers = rebuildPasuramPickers;
window.safeStopAudio = safeStopAudio;
window.resetLineTracking = resetLineTracking;
window.syncUrlToPrefs = syncUrlToPrefs;
window.ensureMarkersForCurrentSelection = ensureMarkersForCurrentSelection;
window.syncTextToAudioTimeline = syncTextToAudioTimeline;

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
    rebuildPasuramPickers();
});