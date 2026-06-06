const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Output file path goes straight to your repository root
const OUTPUT_FILE = path.join(process.cwd(), 'sync-check.json');

// Subdirectories to scan recursively
const TARGET_DIRECTORIES = [
    { webPrefix: 'markers', localPath: path.join(process.cwd(), 'markers') },
    { webPrefix: 'audiofiles', localPath: path.join(process.cwd(), 'audiofiles') }
];

const assetMap = {};
let systemWideRawHashes = "";

/**
 * Standard utility to calculate MD5 checksums of files
 */
function getFileMd5Hash(absolutePath) {
    const fileBuffer = fs.readFileSync(absolutePath);
    return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

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

console.log("⚡ Initiating system tree scanning sequence...");

// Pass 1: Walk the target directories (markers and media)
TARGET_DIRECTORIES.forEach(target => {
    if (fs.existsSync(target.localPath)) {
        console.log(`Checking folder directory: ${target.webPrefix}`);
        walkDirectorySync(target.localPath, (absoluteFilePath) => {
            try {
                const fileMd5 = getFileMd5Hash(absoluteFilePath);
                const relativePath = path.relative(process.cwd(), absoluteFilePath).replace(/\\/g, '/');

                assetMap[relativePath] = fileMd5;
                systemWideRawHashes += fileMd5;
            } catch (err) {
                console.error(`❌ Failed processing nested asset: ${absoluteFilePath}`, err.message);
            }
        });
    }
});

// Pass 2: Automatically dynamic scan all standalone .js files sitting right in your repo root
console.log("Checking standalone root files...");
try {
    const rootItems = fs.readdirSync(process.cwd());
    
    rootItems.forEach(item => {
        const absolutePath = path.join(process.cwd(), item);
        const stat = fs.statSync(absolutePath);
        
        // Target only files ending in .js while intentionally ignoring the generated manifest if named .js
        if (stat.isFile() && item.endsWith('.js')) {
            try {
                const fileMd5 = getFileMd5Hash(absolutePath);
                
                assetMap[item] = fileMd5;
                systemWideRawHashes += fileMd5;
                console.log(`✔️ Successfully tracked root JavaScript asset: ${item} [${fileMd5.substring(0, 8)}]`);
            } catch (fileErr) {
                console.error(`❌ Error parsing root asset ${item}:`, fileErr.message);
            }
        }
    });
} catch (dirErr) {
    console.error("❌ Failed to query top level root tree files:", dirErr.message);
}

// Compute systemic cluster verification signature
const globalFingerprint = crypto.createHash('md5').update(systemWideRawHashes).digest('hex').substring(0, 8);

const manifestPayload = {
    server_version: `flat_root_tree_${globalFingerprint}`,
    last_compiled_at: new Date().toISOString(),
    assets: assetMap,
    actions: {
        must_clear_local_storage: []
    }
};

// Save back out to the workspace root
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifestPayload, null, 2));
console.log(`🚀 Manifest finalized. Tracked ${Object.keys(assetMap).length} total assets.`);