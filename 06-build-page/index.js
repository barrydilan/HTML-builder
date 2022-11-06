const fs = require('fs')
const { resolve, join } = require('node:path');
const { mkdir, copyFile, readdir, readFile, stat } = require('fs/promises');
const {writeFile,rm} = require('node:fs');
const { Buffer } = require('node:buffer');
const path = require('path')
const {  constants } =  require('node:fs');
const { default: test } = require('node:test');
const { pipeline } = require('stream/promises');

const assembleHtmlCss = async (tPath, componentsPath, outputPath) => {
    const rs = fs.createReadStream(tPath, 'utf-8');
    const ws = fs.createWriteStream(outputPath);

    let tempHtml = '';

    rs.on('data', chunk => {
      tempHtml += chunk;
    }); //читаем файл, записываем в строку

    rs.on('end', async () => {
      const matches = [...tempHtml.matchAll(/{{(.*)}}/g)];
      for (let component of matches) {
        const componentPath = join(componentsPath, `${component[1]}.html`);
        const content =  await readFile(componentPath);
        tempHtml = tempHtml.replace(component[0], content);
      }
      ws.write(tempHtml);
    }); //заменяем в строке {{элементы}} и записываем в аутпут
    //css bundle
    const cssOut = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'), 'utf-8');
    const cssIn = await fs.promises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
    for (file of cssIn) {
    if (file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) === '.css') {
        const input = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8');
        input.on('data', data => cssOut.write(data));
    }
}
  };
  
async function makeDirectory() {
    const projectFolder = join(__dirname, 'project-dist');
    const dirCreation = await mkdir(projectFolder, { recursive: true });
}








makeDirectory();

assembleHtmlCss("template.html", 'components', 'project-dist/index.html')