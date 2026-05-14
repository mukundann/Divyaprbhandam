/**
 * config.js - Static work definitions
 */
const CONFIG = {
    'TVM': { 
        hasSub: true, maxCh: 10, maxSub: 10, defPas: 11, ex: {'2.7': 13},
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/TVM.${num}.mp3`
    },
    'PT':  { 
        hasSub: true, maxCh: 11, maxSub: 10, defPas: 10, ex: {},
        getAudioSrc: (num) => `https://www.uveda.org/media/recitation/PT.${num}.mp3`
    },
    'PMT': { 
        hasSub: false, maxCh: 10, defPas: 10, ex: {},
        isSingleFile: (num) => parseInt(num.split('.')[0]) === 1,
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0]);
            return chapter === 1 ? `audiofiles/PMT.1.all.m4a` : `https://www.uveda.org/media/recitation/PMT.${num}.mp3`;
        }
    },
    'MUM': {
        hasSub: false, maxCh: 1, defPas: 64, ex: {},
        isSingleFile: () => true,
        getAudioSrc: () => `audiofiles/charamaslokam.mp3`
    },
    'NAT': { 
        hasSub: false, 
        maxCh: 14, 
        defPas: 10, 
        ex: { '1': 10, '8': 10, '11': 10 }, // Add specific pasuram counts per chapter here
        isSingleFile: (num) => {
            // If you have a single audio file for Chapter 1, mark it here
            const chapter = parseInt(num.split('.')[0]);
            return chapter === 1; 
        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0]);
            // Logic to route to local files or external URLs
            return chapter === 1 
                ? `audiofiles/NTM.1.all.m4a` 
                : `https://www.uveda.org/media/recitation/NTM.${num}.mp3`;
        }
    }
};
window.CONFIG = CONFIG;
