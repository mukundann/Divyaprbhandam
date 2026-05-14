const fs = require('fs');
const { execSync } = require('child_process');

// 1. Define paths based on your directory name
const AUDIO_DIR = 'audiofiles';
const CLEAN_DIR = `${AUDIO_DIR}/clean`;
const MARKER_FILE = 'marker.js';

// 2. Read and parse the markers
const content = fs.readFileSync(MARKER_FILE, 'utf8');
const dbMatch = content.match(/window\.MARKER_DATABASE = ({[\s\S]*?});/);

if (!dbMatch) {
    console.error("Could not find MARKER_DATABASE in marker.js");
    process.exit(1);
}

const MARKER_DATABASE = eval(`(${dbMatch[1]})`);

// 3. Ensure clean folder exists
if (!fs.existsSync(CLEAN_DIR)) fs.mkdirSync(CLEAN_DIR, { recursive: true });

// Get marker.js timestamp to detect timing changes
const markerStats = fs.statSync(MARKER_FILE);

Object.keys(MARKER_DATABASE).forEach(key => {
    if (!key.includes('.all')) return; 
    
    const markers = MARKER_DATABASE[key];
    const baseName = key.replace('.all', '');
    const inputFile = `${AUDIO_DIR}/${baseName}.m4a`;
    const outputFile = `${CLEAN_DIR}/${baseName}_clean.m4a`;

    if (!fs.existsSync(inputFile)) {
        console.log(`⚠️ Skipping ${key}: File not found at ${inputFile}`);
        return;
    }

    // 4. SMART CHECK: Only process if audio OR markers are newer than the clean file
    let shouldProcess = false;
    if (!fs.existsSync(outputFile)) {
        shouldProcess = true;
    } else {
        const inputStats = fs.statSync(inputFile);
        const outputStats = fs.statSync(outputFile);
        
        // Process if raw audio is updated OR if the marker definitions changed
        if (inputStats.mtime > outputStats.mtime || markerStats.mtime > outputStats.mtime) {
            shouldProcess = true;
        }
    }

    if (!shouldProcess) {
        console.log(`✅ ${key} is already up to date.`);
        return;
    }

    console.log(`🚀 Cleaning ${key}...`);

    let filter = "";
    let inputs = "";

    markers.forEach((m, i) => {
        const isObj = (typeof m === 'object' && m !== null);
        const start = isObj ? m.start : (i === 0 ? 0 : (typeof markers[i-1] === 'object' ? markers[i-1].end : markers[i-1]));
        const end = isObj ? m.end : m;

        filter += `[0:a]atrim=start=${start}:end=${end},asetpts=PTS-STARTPTS[a${i}]; `;
        inputs += `[a${i}]`;
    });

    const cmd = `ffmpeg -i "${inputFile}" -filter_complex "${filter}${inputs}concat=n=${markers.length}:v=0:a=1[outa]" -map "[outa]" -y "${outputFile}"`;

    try {
        execSync(cmd);
        console.log(`✨ Successfully updated ${outputFile}`);
    } catch (e) {
        console.error(`❌ Error processing ${key}:`, e.message);
    }
});
