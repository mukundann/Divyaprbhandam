// marker.js - Your Pasuram Database

// marker.js - Structural Rules + Timing Markers

window.PASURAM_STRUCTURE = {
    'TVM': { hasSub: true,  maxCh: 10, maxSub: 10, defPas: 11, ex: {'2.7': 13} },
    'PT':  { hasSub: true,  maxCh: 11, maxSub: 10, defPas: 10, ex: {} },
    'PMT': { hasSub: false, maxCh: 10, defPas: 10, ex: {} },
    'NAT': { hasSub: false, maxCh: 14, defPas: 10, ex: {} }
};

window.MARKER_DATABASE = {
    // Periya Thirumozhi (PT)
    'PT.1.1.6': [0.86, 4.21, 8.35, 12.54, 16.63, 20.80],
    
    // Thiruvaimozhi (TVM)
    'TVM.1.1.1': [0.50, 4.20, 8.10, 12.30, 16.40, 19.50],
    'PMT.1.all': [9.13, 35.91, 61.56, 87.65, 113.36, 138.11, 163.92, 189.78, 215, 241.52, 265.43],

    
    // Add new markers here
};

