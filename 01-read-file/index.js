const fs = require('node:fs/promises');
const path = require('node:path');

const readTxt = async () => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8');
        console.log(data)
    }

    catch (err) {
        console.error(err)
    }
}

readTxt()