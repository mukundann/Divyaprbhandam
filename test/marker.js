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
        'PT.1.1.1': [6.57, 14.9, 22.25],

    'PT.1.1.6': [6,12,20],

      'PT.5.1.1': [3.61, 10.99, 17.75],
    'PT.5.1.2': [6.07, 11.86, 18.28],
    'PT.5.1.3': [6.3, 13.1, 20.61],
    'PT.5.1.4': [6.56, 13.12, 19.61],
    'PT.5.1.5': [6.54, 12.61, 18.96],
    'PT.5.1.6': [6.39, 11.82, 18.22],
    'PT.5.1.7': [6.87, 13.71, 19.71],
    'PT.5.1.8': [6.57, 13.11, 19.75],
    'PT.5.1.9': [7.15, 12.63, 18.12],
    'PT.5.1.10': [6.11, 12.79, 20.09],

    
    // Thiruvaimozhi (TVM)
    'TVM.1.1.1': [0.50, 4.20, 8.10, 12.30, 16.40, 19.50],
    'MUM.all': [0,      // Suthram 1 start
        15.4,   // Suthram 2 start
        32.1,   // Suthram 3 start
        48.9,   // Suthram 4 start
        65.3    // ... continue adding as you record
                ],
    
    // Add new markers here
};
