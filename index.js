const fsPromises = require('node:fs/promises');
const path = require('node:path');
const fs = require("node:fs");
const EventEmitter = require('node:events');
const os = require('node:os');

const foobar = async () => {

    // await  fsPromises.writeFile('test.txt', 'hello world\n');
    //
    // const data = await fsPromises.readFile('test.txt', 'utf8');
    // console.log(data);
    //
    // const pathToFile = path.join(__dirname, 'test.txt');
    // await fsPromises.writeFile(pathToFile, 'hello world\n');
    // const data = await fsPromises.readFile(pathToFile, 'utf8');
    // await fsPromises.appendFile(pathToFile, 'Some new data')
    // const newData = await fsPromises.readFile(pathToFile, 'utf8');
    // console.log(newData);
    //
    // await fsPromises.mkdir(path.join(__dirname, 'new-folder'), { recursive: true });
    //
    // await fsPromises.rm(path.join(__dirname, 'new folder'), {recursive: true, force: true });
    //
    // await fsPromises.unlink(pathToFile) //delete file
    // await fsPromises.rename(pathToFile, path.join(__dirname, 'new-folder', 'new-file.txt'), {recursive: true})
    // await fsPromises.copyFile(pathToFile,path.join(__dirname, 'new-folder', 'new-file.txt'))
    // const stat = await fsPromises.stat(pathToFile);
    // console.log(stat.isFile());

     //Streams
    // const pathToFile = path.join(__dirname, 'D5100RM.pdf');
    // const readStream = fs.createReadStream(pathToFile);
    // const writeStream = fs.createWriteStream(path.join(__dirname, 'new-big-file.pdf'));
    // readStream.on('data', (chunk) => {
    //     console.log('chunk', chunk.length);
    //     writeStream.write(chunk);
    // })
    // readStream.pipe(writeStream);

    //Events
    // const emitter = new EventEmitter();
    // emitter.once('event1', (...args) => {
    //     console.log('Event 1 happened');
    //     console.log(args);
    //     console.log('____________');
    // })
    // emitter.on('event2', (...args) => {
    //     console.log('Event 2 happened');
    //     console.log(args);
    //     console.log('____________');
    // })
    //
    // emitter.emit('event1', 'Hello', 555, 15);
    // emitter.emit('event2', 'Hi', 121);

    //OS
    console.log(os.arch());
    console.log(os.cpus());
    console.log(os.freemem() / 1024 / 1024 / 1024, 'gb');
    console.log(os.totalmem() / 1024 / 1024 / 1024, 'gb');
    console.log(os.homedir());
    console.log(os.hostname());
    console.log(os.platform());
    console.log(os.userInfo());

}

void foobar();
