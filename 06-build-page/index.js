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

async function copyDir(input, output) {
  const assets = await fs.promises.readdir(input, { withFileTypes: true });
  await fs.promises.mkdir(output, { recursive: true });
  for (file of assets) {
      if (file.isDirectory()) {
          await copyDir(path.join(input , file.name), path.join(output, file.name));
      } else {
          await fs.promises.copyFile(path.join(input , file.name), path.join(output, file.name));
      }
  }
}









makeDirectory();
copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist/assets'));
assembleHtmlCss(path.join(__dirname,"template.html"), path.join(__dirname,'components'), path.join(__dirname,'project-dist/index.html'))