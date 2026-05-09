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
    'PT.1.1.6': [6,12,20],
    
    // Thiruvaimozhi (TVM)
    'TVM.1.1.1': [0.50, 4.20, 8.10, 12.30, 16.40, 19.50],
    
    // Add new markers here
};
