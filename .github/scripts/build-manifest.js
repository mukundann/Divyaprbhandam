const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Output file path goes straight to your repository root
const OUTPUT_FILE = path.join(process.cwd(), 'sync-check.json');

// Root targets to monitor dynamically (local paths point directly to repo roots)
const TARGET_DIRECTORIES = [
    { webPrefix: 'markers', localPath: path.join(process.cwd(), 'markers') },
    { webPrefix: 'audiofiles', localPath: path.join(process.cwd(), 'audiofiles') }
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

console.log("⚡ Initiating flat root environment tree scanning sequence...");

// 1. Scan your structured directories (markers, audio)
TARGET_DIRECTORIES.forEach(target => {
    if (fs.existsSync(target.localPath)) {
        console.log(`Checking folder: ${target.webPrefix}`);
        walkDirectorySync(target.localPath, (absoluteFilePath) => {
            try {
                const fileBuffer = fs.readFileSync(absoluteFilePath);
                const fileMd5 = crypto.createHash('md5').update(fileBuffer).digest('hex');
                const relativePath = path.relative(process.cwd(), absoluteFilePath).replace(/\\/g, '/');

                assetMap[relativePath] = fileMd5;
                systemWideRawHashes += fileMd5;
            } catch (err) {
                console.error(`❌ Failed processing object: ${absoluteFilePath}`, err.message);
            }
        });
    }
});

// 2. Manually track standalone engine files sitting right in your root directory
const rootStandaloneFiles = ['playerEngine.js', 'sync-engine.js'];
rootStandaloneFiles.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
        const fileBuffer = fs.readFileSync(fullPath);
        const fileMd5 = crypto.createHash('md5').update(fileBuffer).digest('hex');
        
        assetMap[file] = fileMd5;
        systemWideRawHashes += fileMd5;
        console.log(`✔️ Processed root standalone asset: ${file}`);
    }
});

const globalFingerprint = crypto.createHash('md5').update(systemWideRawHashes).digest('hex').substring(0, 8);

const manifestPayload = {
    server_version: `flat_root_${globalFingerprint}`,
    last_compiled_at: new Date().toISOString(),
    assets: assetMap,
    actions: { must_clear_local_storage: [] }
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifestPayload, null, 2));
console.log(`🚀 System manifest file finalized successfully at root: ${OUTPUT_FILE}`);