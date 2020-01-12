import * as fs from 'fs';

export function readJson(filename: string) {
    const json: string = fs.readFileSync(filename, 'utf8');
    return JSON.parse(json);
}

export function writeJson(filename: string, data: any) {
    const json: string = JSON.stringify(data, null, 4);
    fs.writeFileSync(filename, json);
}

export function buildNpmPackage() {
    const packageJson = readJson('package.json');
    const distPackageJson: any = {};
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
