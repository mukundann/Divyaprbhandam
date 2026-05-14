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
    }
};
window.CONFIG = CONFIG;
