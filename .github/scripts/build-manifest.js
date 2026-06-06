const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Output file path drops 'public' and saves to your repository root
const OUTPUT_FILE = path.join(process.cwd(), 'sync-check.json');

// Root directories to map (paths are relative to project root)
const TARGET_DIRECTORIES = [
    { webPrefix: 'markers', localPath: path.join(process.cwd(), 'markers') },
    { webPrefix: 'audiofiles', localPath: path.join(process.cwd(), 'audiofiles') },
    { webPrefix: 'js', localPath: path.join(process.cwd(), 'js') }
];

const assetMap = {};
let systemWideRawHashes = "";

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

console.log("⚡ Initiating systemic root directory scanning sequence...");

TARGET_DIRECTORIES.forEach(target => {
    if (fs.existsSync(target.localPath)) {
        console.log(`Checking root directory: ${target.webPrefix}`);
        
        walkDirectorySync(target.localPath, (absoluteFilePath) => {
            try {
                const fileBuffer = fs.readFileSync(absoluteFilePath);
                const fileMd5 = crypto.createHash('md5').update(fileBuffer).digest('hex');
                
                // Construct standard clean URLs relative to the root directory
                const relativePath = path.relative(process.cwd(), absoluteFilePath)
                                        .replace(/\\/g, '/');

                assetMap[relativePath] = fileMd5;
                systemWideRawHashes += fileMd5;
                
            } catch (err) {
                console.error(`❌ Failed processing object: ${absoluteFilePath}`, err.message);
            }
        });
    } else {
        console.warn(`⚠️ Path skipped (not found in root): ${target.localPath}`);
    }
});

const globalFingerprint = crypto.createHash('md5').update(systemWideRawHashes).digest('hex').substring(0, 8);

const manifestPayload = {
    server_version: `root_tree_${globalFingerprint}`,
    last_compiled_at: new Date().toISOString(),
    assets: assetMap,
    actions: {
        must_clear_local_storage: []
    }
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifestPayload, null, 2));
console.log(`🚀 Tree verification file finalized successfully at root: ${OUTPUT_FILE}`);