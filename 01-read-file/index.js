const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'})
const text = []

readStream.on('error', err => console.error(`Error: ${err}`))
readStream.on('data', word => text.push(word))
readStream.on('end', () => console.log(text.join('')))
