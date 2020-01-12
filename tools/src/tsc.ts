import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

export function compile(fileNames: string[], options: ts.CompilerOptions): void {
    const program = ts.createProgram(fileNames, options);
    const emitResult = program.emit();

    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            console.error(`${chalk.blueBright(diagnostic.file.fileName)}:${chalk.green(((line + 1) + ':' + (character + 1)))}`);
        }
        console.error('ErrorMessage:' + chalk.red(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')), '\n');
    });


    if (emitResult.emitSkipped || allDiagnostics.length > 0) {
        console.error(`${chalk.red('Build Failed!.')}`, '\n');
        process.exit(1);
    } else {
        console.log(`${chalk.green('Build Succeeded!')}`, '\n');
    }
}

export function readJson(filename: string) {
    const json: string = fs.readFileSync(filename, 'utf8');
    return JSON.parse(json);
}

export function writeJson(filename: string, data: any) {
    const json: string = JSON.stringify(data, null, 4);
    fs.writeFileSync(filename, json);
}

export function tsc(tsConfigFilename: string) {
    const raw: any = readJson(tsConfigFilename);
    const tsconfig = ts.parseJsonConfigFileContent(raw, ts.sys, './');
    if (!tsconfig) {
        console.error(chalk.red(`could not find tsconfig: ${path.resolve(tsConfigFilename)}`));
        return;
    }
    compile(tsconfig.fileNames, tsconfig.options);
}

export function buildNpmPackage() {
    tsc('./tsconfig.json');
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
    distPackageJson.typings = 'index.d.ts';

    writeJson('./build/package.json', distPackageJson);
}
