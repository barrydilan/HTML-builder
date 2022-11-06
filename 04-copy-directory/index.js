const { mkdir } = require('node:fs/promises');
const fs = require('fs')
const { resolve, join } = require('node:path');
const path = require('path')
const { copyFile, constants } =  require('node:fs');
const currentPath = path.join(__dirname, 'files')
const destPath = path.join(__dirname, 'files-copy')


async function makeDirectory() {
    const projectFolder = join(__dirname, 'files-copy');
    const dirCreation = await mkdir(projectFolder, { recursive: true });
}

function copyDIR() {
    makeDirectory()
    filenames = fs.readdirSync(currentPath, { withFileTypes: false } );
    filenames.forEach(file => {
        copyFile(`files/${file}`, `files-copy/${file}`, () => {});
    })
}

copyDIR()