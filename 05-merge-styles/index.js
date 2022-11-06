const fs = require('fs/promises');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const buildPath = path.join(__dirname, 'project-dist');

const mergeCss = async (stylesPath, buildPath, fileName) => {
  const styles = await fs.readdir(stylesPath, { withFileTypes: true })
  const filtredStyles= styles.filter(item => path.extname(item.name) === '.css' && item.isFile());
  const styleCss = await Promise.all(filtredStyles.map(file => fs.readFile(path.join(stylesPath, file.name), 'utf-8')));
  
  await fs.writeFile(path.join(buildPath, fileName), styleCss.join('\n'));
  
}

mergeCss(stylesPath, buildPath, 'bundle.css')


