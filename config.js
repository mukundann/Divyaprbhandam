/**
 * config.js - Static book structures, asset paths, and asynchronous dynamic script loaders
 */

const ROOT = 'aruLicheyal';

/** Returns the standard flat marker path for simple books */
function flatMarkerPath(book) {
    const b = book.toLowerCase();
    return `${ROOT}/${book}/markers/marker_${b}_timelines.js`;
}

/** Returns the standard flat language path for simple books */
function flatLangPath(book, langCode) {
    const b = book.toLowerCase();
    return `${ROOT}/${book}/text/marker_${b}_${langCode}.js`;
}

/** Groups pasuram into batches of 10: pasuram 11 → BOOK_11_20.ogg */
function batchAudio(pasuram, maxPas, book) {
    const start = Math.floor((pasuram - 1) / 10) * 10 + 1;
    const end = Math.min(start + 9, maxPas);
    return `${ROOT}/${book}/audiofiles/${book}_${start}_${end}.ogg`;
}

/**
 * Factory for sub-chapter books: TVM, PTM, PAT.
 */
function makeSubChapterBook(opts) {
    const { key, remotePrefix } = opts;
    return {
        structure: 'chapter_sub_pasuram',
        hasSub: opts.hasSub,
        maxCh: opts.maxCh,
        maxSub: opts.maxSub,
        defPas: opts.defPas,
        ex: opts.ex,
        availableContent: opts.availableContent,

        getMarkerPath(num) {
            if (!num) return undefined;
            const chapter = num.split('.')[0];
            return `${ROOT}/${key}/markers/timelines_${chapter}.js`;
        },

        getAudioSrc(num) {
            if (!num) return '';
            const [chapter, subChapter] = num.split('.');
            return `${ROOT}/${key}/audiofiles/${key}_${chapter}.${subChapter}.ogg`;
        },

        getLanguagePath(num, langCode) {
            const lang = langCode || 'en';
            const chapter = num.split('.')[0];
            return `${ROOT}/${key}/text/${chapter}_${lang}.js`;
        }
    };
}

/**
 * Factory for grouped single-chapter books.
 */
function makeGroupedBook({ key, defPas, ex = {}, minCh = 0, maxCh = 1 }) {
    return {
        structure: 'chapter_pasuram',
        hasSub: false, minCh, maxCh, defPas, ex,

        getMarkerPath: () => flatMarkerPath(key),
        getLanguagePath: (_num, langCode) => flatLangPath(key, langCode),

        getAudioSrc(num) {
            const [ch, pas] = num.split('.');
            const chapter = parseInt(ch, 10);
            const pasuram = parseInt(pas, 10);
            if (chapter === 0) return `${ROOT}/${key}/audiofiles/${key}_0.ogg`;
            if (chapter === 1) return batchAudio(pasuram, defPas, key);
        }
    };
}

/**
 * Factory for simple per-chapter books.
 */
function makeSimpleBook({ key, defPas, ex = {}, minCh = 0, maxCh = 1 }) {
    return {
        structure: 'chapter_pasuram',
        hasSub: false, minCh, maxCh, defPas, ex,

        getMarkerPath: () => flatMarkerPath(key),
        getLanguagePath: (_num, langCode) => flatLangPath(key, langCode),
        getAudioSrc: (num) => `${ROOT}/${key}/audiofiles/${key}_${parseInt(num.split('.')[0], 10)}.ogg`
    };
}

/**
 * Factory for Custom Playlist Books.
 * Can compile items defined as whole chapters, whole subchapters, or explicit pasurams.
 */
function makeCustomPlaylistBook({ key, items = [] }) {
    return {
        structure: 'flat_pasuram',
        isPlaylist: true,
        hasSub: false,
        minCh: 1,
        maxCh: 1,
        rawItems: items,

        // Lazy-resolves playlist definition into explicit individual pasurams
        getCompiledPlaylist() {
            if (this._compiled) return this._compiled;

            const compiled = [];
            for (const item of this.rawItems) {
                const targetBook = CONFIG[item.book];
                if (!targetBook) continue;

                // Case 1: Whole Chapter
                if (typeof item.chapter !== 'undefined' && typeof item.sub === 'undefined' && !item.pasuram) {
                    const ch = item.chapter;
                    if (targetBook.hasSub) {
                        const maxSub = targetBook.maxSub || 10;
                        for (let s = 1; s <= maxSub; s++) {
                            const count = (typeof Navigation !== 'undefined')
                                ? Navigation.getLimit(item.book, ch, s)
                                : (targetBook.defPas || 10);
                            for (let p = 1; p <= count; p++) {
                                compiled.push({ book: item.book, pasuram: `${ch}.${s}.${p}` });
                            }
                        }
                    } else {
                        const count = (typeof Navigation !== 'undefined')
                            ? Navigation.getLimit(item.book, ch, 0)
                            : (targetBook.defPas || 10);
                        for (let p = 1; p <= count; p++) {
                            compiled.push({ book: item.book, pasuram: `${ch}.${p}` });
                        }
                    }
                }
                // Case 2: Whole Subchapter (Decad)
                else if (typeof item.chapter !== 'undefined' && typeof item.sub !== 'undefined' && !item.pasuram) {
                    const count = (typeof Navigation !== 'undefined')
                        ? Navigation.getLimit(item.book, item.chapter, item.sub)
                        : (targetBook.defPas || 10);
                    for (let p = 1; p <= count; p++) {
                        compiled.push({ book: item.book, pasuram: `${item.chapter}.${item.sub}.${p}` });
                    }
                }
                // Case 3: Explicit Pasuram
                else if (item.pasuram) {
                    compiled.push({ book: item.book, pasuram: String(item.pasuram) });
                }
            }

            this._compiled = compiled;
            return compiled;
        },

        get maxPas() {
            return this.getCompiledPlaylist().length;
        },

        get defPas() {
            return this.maxPas;
        },

        getItem(num) {
            const list = this.getCompiledPlaylist();
            const index = parseInt(num, 10) - 1;
            return list[index] || null;
        },

        getMarkerPath(num) {
            const item = this.getItem(num);
            if (!item) return undefined;
            const targetBook = CONFIG[item.book];
            return targetBook ? targetBook.getMarkerPath(item.pasuram) : undefined;
        },

        getLanguagePath(num, langCode) {
            const item = this.getItem(num);
            if (!item) return undefined;
            const targetBook = CONFIG[item.book];
            return targetBook ? targetBook.getLanguagePath(item.pasuram, langCode) : undefined;
        },

        getAudioSrc(num) {
            const item = this.getItem(num);
            if (!item) return '';
            const targetBook = CONFIG[item.book];
            return targetBook ? targetBook.getAudioSrc(item.pasuram) : '';
        }
    };
}

const CONFIG = {
    'PTN': makeSimpleBook({ key: 'PTN', defPas: 5, ex: { '0': 1 }, maxCh: 2 }),
    'TPL': makeSimpleBook({ key: 'TPL', defPas: 12, ex: { '0': 3 } }),
    'PAT': makeSubChapterBook({
        key: 'PAT', remotePrefix: 'PT',
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 5, maxSub: 10, defPas: 10,
        ex: { '1.2': 21, '1.5': 11, '1.6': 11, '1.7': 11, '1.8': 11 },
    }),
    'TPV': makeGroupedBook({ key: 'TPV', defPas: 30, ex: { '0': 3 } }),
    'NAT': makeSimpleBook({ key: 'NAT', defPas: 11, ex: { '0': 2, '4': 12, '5': 12, '6': 12 }, minCh: 0, maxCh: 14 }),
    'PMT': makeSimpleBook({ key: 'PMT', defPas: 12, ex: { '0': 2, '2': 10, '3': 10, '5': 11, '6': 11 }, minCh: 0, maxCh: 10 }),
    'TCV': makeGroupedBook({ key: 'TCV', defPas: 120, ex: { '0': 2 } }),
    'TCV2': makeGroupedBook({ key: 'TCV2', defPas: 120, ex: { '0': 2 } }),
    'TML': makeGroupedBook({ key: 'TML', defPas: 45, ex: { '0': 1 } }),
    'TPE': makeGroupedBook({ key: 'TPE', defPas: 10, ex: { '0': 2 } }),
    'AAP': makeSimpleBook({ key: 'AAP', defPas: 10, ex: { '0': 2 } }),
    'KCT': makeSimpleBook({ key: 'KCT', defPas: 11, ex: { '0': 2 } }),

    // --- 2000 ---
    'PTM': makeSubChapterBook({
        key: 'PTM', remotePrefix: 'PT',
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 11, maxSub: 10, defPas: 11,
    }),
    'TKT': makeGroupedBook({ key: 'TKT', defPas: 20, ex: { '0': 3 } }),
    'TNT': makeGroupedBook({ key: 'TNT', defPas: 30, ex: { '0': 3 } }),

    // --- 3000 ---
    '1TA': makeGroupedBook({ key: '1TA', defPas: 100, ex: { '0': 1 } }),
    '2TA': makeGroupedBook({ key: '2TA', defPas: 100, ex: { '0': 1 } }),
    '3TA': makeGroupedBook({ key: '3TA', defPas: 100, ex: { '0': 1 } }),
    '4TA': makeGroupedBook({ key: '4TA', defPas: 97, ex: { '0': 1 } }),
    'PTA': makeGroupedBook({ key: 'PTA', defPas: 87, ex: { '0': 1 } }),
    'TVT': makeGroupedBook({ key: 'TVT', defPas: 100, ex: { '0': 1 } }),
    'TVS': makeSimpleBook({ key: 'TVS', defPas: 7, ex: { '0': 1 } }),
    'TVK': makeSimpleBook({ key: 'TVK', defPas: 8, ex: { '0': 1 } }),

    // --- 4000 ---
    'TVM': makeSubChapterBook({
        key: 'TVM', remotePrefix: 'TVM',
        structure: 'chapter_sub_pasuram',
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 11, ex: { '2.7': 13 },
    }),
    'RN': makeGroupedBook({ key: 'RN', defPas: 108, ex: { '0': 3 } }),
    'URM': makeGroupedBook({ key: 'URM', defPas: 74, ex: { '0': 1 } }),

    // --- PLAYLIST EXAMPLE ---
    'NTS': makeCustomPlaylistBook({
        key: 'NTS',
        items: [
            { book: 'PTN', pasuram: '0.1' },          // Single pasuram
            { book: 'TPL', chapter: 1 },              // Entire Chapter 1 of TPL
            { book: 'TPE', chapter: 1 },
            { book: 'TPV', chapter: 1 },
            { book: 'AAP', chapter: 1 },         // Single pasuram
            { book: 'KCT', chapter: 1 }
        ]
    })
};

// ---------------------------------------------------------------------------
// DYNAMIC LOADER
// ---------------------------------------------------------------------------

function loadMarkerOnDemand(pre, numVal, langCode, callback) {
    let targetPre = pre;
    let targetNumVal = numVal;

    if (CONFIG[pre] && CONFIG[pre].isPlaylist) {
        const item = CONFIG[pre].getItem(numVal);
        if (item) {
            targetPre = item.book;
            targetNumVal = item.pasuram;
        }
    }

    const book = CONFIG[targetPre];
    if (!book || typeof book.getMarkerPath !== 'function') {
        console.error("Marker path resolution strategy missing for book prefix:", targetPre);
        return;
    }

    window.LOADED_SCRIPTS = window.LOADED_SCRIPTS || {};
    const timelinePath = book.getMarkerPath(targetNumVal);

    if (!timelinePath) {
        if (callback) callback();
        return;
    }

    if (window.LOADED_SCRIPTS[timelinePath]) {
        handleLanguageInjection(book, targetNumVal, langCode, callback);
        return;
    }

    const script = document.createElement('script');
    script.src = timelinePath;
    script.onload = () => {
        window.LOADED_SCRIPTS[timelinePath] = true;
        handleLanguageInjection(book, targetNumVal, langCode, callback);
    };
    script.onerror = () => {
        console.error(`Failed to load timeline: ${timelinePath}`);
        if (callback) callback();
    };
    document.head.appendChild(script);
}

function handleLanguageInjection(book, numVal, langCode, callback) {
    if (typeof book.getLanguagePath !== 'function') {
        if (callback) callback();
        return;
    }

    const textAssetPath = book.getLanguagePath(numVal, langCode);

    if (textAssetPath && !window.LOADED_SCRIPTS[textAssetPath]) {
        const langScript = document.createElement('script');
        langScript.src = textAssetPath;
        langScript.onload = () => {
            window.LOADED_SCRIPTS[textAssetPath] = true;
            if (typeof window.mergeLanguageTexts === 'function') {
                window.mergeLanguageTexts(langCode);
            }
            if (callback) callback();
        };
        langScript.onerror = () => {
            console.error(`Failed to load language layer: ${textAssetPath}`);
            if (callback) callback();
        };
        document.head.appendChild(langScript);
    } else {
        if (callback) callback();
    }
}

window.CONFIG = CONFIG;
window.loadMarkerOnDemand = loadMarkerOnDemand;