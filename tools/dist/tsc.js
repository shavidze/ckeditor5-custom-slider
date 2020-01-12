"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readJson(filename) {
    const json = fs.readFileSync(filename, 'utf8');
    return JSON.parse(json);
}
exports.readJson = readJson;
function writeJson(filename, data) {
    const json = JSON.stringify(data, null, 4);
    fs.writeFileSync(filename, json);
}
exports.writeJson = writeJson;
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
    distPackageJson.main = 'index.js';
    writeJson('./build/package.json', distPackageJson);
}
exports.buildNpmPackage = buildNpmPackage;
