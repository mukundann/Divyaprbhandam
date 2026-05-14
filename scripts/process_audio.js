Object.keys(MARKER_DATABASE).forEach(key => {
    if (!key.includes('.all')) return; 
    
    const markers = MARKER_DATABASE[key];
    
    // ADJUSTMENT: Match your actual filename NAT.2.all.m4a
    const inputFile = `${AUDIO_DIR}/${key}.m4a`; 
    const outputFile = `${CLEAN_DIR}/${key}_clean.m4a`;

    if (!fs.existsSync(inputFile)) {
        // Fallback: Try base name without '.all' just in case
        const baseName = key.replace('.all', '');
        const fallbackFile = `${AUDIO_DIR}/${baseName}.m4a`;
        
        if (fs.existsSync(fallbackFile)) {
            processFile(fallbackFile, outputFile, markers, key);
        } else {
            console.log(`⚠️ Skipping ${key}: Neither ${inputFile} nor ${fallbackFile} found.`);
            return;
        }
    } else {
        processFile(inputFile, outputFile, markers, key);
    }
});

// Helper function to keep the code clean
function processFile(inputFile, outputFile, markers, key) {
    // ... insert the 'shouldProcess' check and FFmpeg command here ...
}
