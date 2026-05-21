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
    hasSub: false, 
    maxCh: 10, 
    defPas: 10, 
    ex: {},
    // Chapter 1 and 2 are handled as single files by our automation
    isSingleFile: (num) => {
        const chapter = parseInt(num.split('.')[0]);
        return chapter === 1 || chapter === 2|| chapter === 3|| chapter === 4|| chapter === 5;
    },
    getAudioSrc: (num) => {
        const chapter = parseInt(num.split('.')[0]);
        
        // Routing logic based on chapter availability
        if (chapter === 1) {
            return `audiofiles/PMT.1.all.ogg`; 
        } 
        if (chapter === 2) {
            // Using the OGG version for Chapter 2
            return `audiofiles/PMT.2.all.ogg`;
        }
        if (chapter === 3) {
            // Using the OGG version for Chapter 2
            return `audiofiles/PMT.3.all.ogg`;
        }
        if (chapter === 4) {
            // Using the OGG version for Chapter 2
            return `audiofiles/PMT.4.all.ogg`;
        }
        if (chapter === 5) {
            // Using the OGG version for Chapter 2
            return `audiofiles/PMT.5.all.ogg`;
        }
        // Default remote fallback for Chapters 3-10
        return `https://www.uveda.org/media/recitation/PMT.${num}.mp3`;
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
   
        isSingleFile: (num) => {
            // If you have a single audio file for Chapter 1, mark it here
            const chapter = parseInt(num.split('.')[0]);
            return chapter === 2; 
        },
        getAudioSrc: (num) => {
            const chapter = parseInt(num.split('.')[0]);
            // Logic to route to local files or external URLs
            return chapter === 2 
                ? `audiofiles/NAT.2.all.m4a` 
                : `https://www.uveda.org/media/recitation/NAT.${num}.mp3`;
        }
    },
    "RN": {
    hasSub: false,       // Stays a flat sequence of 108 pasurams
    maxPas: 108,
    getAudioSrc: function(numInput) {
        const pasNum = parseInt(numInput, 10);
        
        // Math to group pasurams: 1-10 -> start 1, 11-20 -> start 11, etc.
        let startGroup = Math.floor((pasNum - 1) / 10) * 10 + 1;
        let endGroup = startGroup + 9;
        
        // Cap the final group safely at the maximum limit of 108
        if (endGroup > 108) endGroup = 108;
        
        // Returns paths like: audio/rn/rn_1_10.mp3, audio/rn/rn_11_20.mp3
        return `audio/rn/rn_${startGroup}_${endGroup}.ogg`;
    },
    isSingleFile: true   // Instructs player components to locate data blocks locally
}
    
};
window.CONFIG = CONFIG;
