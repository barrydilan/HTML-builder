const { mkdir } = require('node:fs/promises');
const fs = require('fs')
const { resolve, join } = require('node:path');
const path = require('path')
const { copyFile, constants } = require('node:fs');
const currentPath = path.join(__dirname, 'files')
const destPath = path.join(__dirname, 'files-copy')
const fsPromises = fs.promises;

function copyDIR() {
    fs.rm(destPath, { force: true, recursive: true }, (err) => {
        fs.mkdir(destPath, { recursive: true }, (err) => {
        })
        fsPromises.readdir(currentPath, { withFileTypes: true }).then(files => {
            files.forEach(file => {
                const currentFilePath = path.join(__dirname, 'files', file.name);
                const destFilePath = path.join(__dirname, 'files-copy', file.name);
                fsPromises.copyFile(currentFilePath, destFilePath);
            });
        });
    });
};
copyDIR()