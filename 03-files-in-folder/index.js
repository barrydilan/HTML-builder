const fs = require('fs');
const path = require('path');
const currentPath = path.join(__dirname, 'secret-folder')
filenames = fs.readdirSync(currentPath, { withFileTypes: true } );
  
console.log("\nSecret folder filenames:");

filenames.forEach(file => {
    let fSize;
    if (file.isFile()) {
        fs.stat(path.join(currentPath,file.name), (err, stats) => {
            fSize = stats.size/1024; 
            console.log(file.name.split(".")[0],"-", path.extname(file.name).slice(1), "-", Number(fSize).toFixed(3)+"kb")
    })
    }
});
