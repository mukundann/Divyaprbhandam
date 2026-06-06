const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sync-check.json');

// Define the root target paths to track inside the public deployment layout
const TARGET_DIRECTORIES = [
    { webPrefix: 'markers', localPath: path.join(process.cwd(), 'public', 'markers') },
    { webPrefix: 'audiofiles', localPath: path.join(process.cwd(), 'public', 'audiofiles') },
    { webPrefix: 'config', localPath: path.join(process.cwd(), 'public', 'js', 'config') } // Adjust to match config path
];

const assetMap = {};
let systemWideRawHashes = "";

/**
 * Recursively scans directories to collect file paths
 */
function walkDirectorySync(currentDirPath, callback) {
    if (!fs.existsSync(currentDirPath)) return;
    
    fs.readdirSync(currentDirPath).forEach(name => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            walkDirectorySync(filePath, callback);
        } else if (stat.isFile()) {
            callback(filePath);
        }
    });
}

console.log("⚡ Initiating systemic recursive tree scanning sequence...");

TARGET_DIRECTORIES.forEach(target => {
    console.log(`Checking tree path: ${target.webPrefix}`);
    
    walkDirectorySync(target.localPath, (absoluteFilePath) => {
        try {
            const fileBuffer = fs.readFileSync(absoluteFilePath);
            const fileMd5 = crypto.createHash('md5').update(fileBuffer).digest('hex');
            
            // Reconstruct web relative reference path
            // e.g., "public/markers/TPA/marker_tpl_ta.js" -> "markers/TPA/marker_tpl_ta.js"
            const relativePath = path.relative(path.join(process.cwd(), 'public'), absoluteFilePath)
                                    .replace(/\\/g, '/'); // Standardize URL paths across Windows/Linux runners

            assetMap[relativePath] = fileMd5;
            systemWideRawHashes += fileMd5;
            
        } catch (err) {
            console.error(`❌ Failed processing object context: ${absoluteFilePath}`, err.message);
        }
    });
});

// Compute structural cluster validation signature
const globalFingerprint = crypto.createHash('md5').update(systemWideRawHashes).digest('hex').substring(0, 8);

const manifestPayload = {
    server_version: `global_tree_${globalFingerprint}`,
    last_compiled_at: new Date().toISOString(),
    assets: assetMap,
    actions: {
        must_clear_local_storage: []
    }
};

// Write out static mapping reference file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifestPayload, null, 2));
console.log(`🚀 Tree verification file finalized successfully at: ${OUTPUT_FILE}`);