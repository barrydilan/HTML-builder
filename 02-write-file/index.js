const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin , stdout } = process
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'))

stdout.write('Enter text:\n')

stdin.on('data', data => {
    const inputData = data.toString().trim()
    if(inputData === 'exit') exitProcess()

    output.write(data)
})

process.on('SIGINT', exitProcess)

function exitProcess() {
    stdout.write('Bye!')
    process.exit()
}

