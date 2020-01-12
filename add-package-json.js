const fs = require("fs");

function readJson(filename) {
    const json = fs.readFileSync(filename, 'utf8');
    return JSON.parse(json);
}

function writeJson(filename, data) {
    const json = JSON.stringify(data, null, 4);
    fs.writeFileSync(filename, json);
}

function buildNpmPackage() {
    const packageJson = readJson('package.json');
    const distPackageJson = {};
    [
        'name',
        'version',
        'dependencies',
        'peerDependencies',
    ].forEach(key => {
        if (packageJson[key]) {
            distPackageJson[key] = packageJson[key];
        }
    });
    distPackageJson.main = 'ckeditor.js';
    writeJson('./build/package.json', distPackageJson);
}

buildNpmPackage();
