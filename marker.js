/**
 * MARKER_DATABASE
 * Format: 'Prefix.Number': [Array of Timestamps in Seconds]
 * 
 * Rules for entry:
 * 1. The first number is the start of Line 1 (usually after initial silence).
 * 2. Each subsequent number is the END of that line (the start of the pause).
 * 3. The final number is the absolute end of the audio file.
 */

const MARKER_DATABASE = {
    // Periya Thirumozhi (PT)
    'PT.1.1.6': [0.86, 4.21, 8.35, 12.54, 16.63, 20.80],
    
    // Thiruvaimozhi (TVM)
    'TVM.1.1.1': [0.50, 4.20, 8.10, 12.30, 16.40, 19.50],
    'TVM.1.1.2': [0.45, 3.90, 7.85, 11.90, 15.60, 18.20],
    
    // Naachiyar Thirumozhi (NAT)
    'NAT.1.1': [1.10, 5.40, 9.60, 13.80, 18.10, 22.00],
    
    // Perumal Thirumozhi (PMT)
    'PMT.1.1': [0.90, 4.80, 9.10, 13.50, 17.80, 21.40]
};
