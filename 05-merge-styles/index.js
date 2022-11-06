const fs = require('fs')
const { resolve, join } = require('node:path');
const { readFile, writeFile,rm} = require('node:fs');
const { Buffer } = require('node:buffer');
const path = require('path')
const { copyFile, constants } =  require('node:fs');
const { default: test } = require('node:test');
const currentPath = path.join(__dirname, 'styles')


filenames = fs.readdirSync(currentPath, { withFileTypes: true } );
filenames1 = fs.readdirSync("project-dist", { withFileTypes: false } );


function createBundle() {    
    if (Array.from(filenames1)[0]=="bundle.css") {
        fs.rm("project-dist/bundle.css", {force: true}, ()=>{})
    }
    filenames.forEach(file => {
    if (file.isFile() && file.name.split(".")[1] == "css") {
    readFile(path.join(currentPath, file.name), "utf-8", (err, data) => {
    fs.appendFile("project-dist/bundle.css", data, ()=>{})
    });   
}
})
}

createBundle();



