const http = require('node:http');
const path = require('node:path');
const readline = require('node:readline/promises');
const {foo: helperFoo} = require('./helper')


const func =  async () => {
    //http
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({
    //         data: 'Hello World!',
    //     }));
    // });
    //
    // server.listen(8000);

    //Path
    // const pathToFile = __filename;
    // console.log(pathToFile);
    // console.log(path.dirname(pathToFile));
    // console.log(path.extname(pathToFile));
    // console.log(path.basename(pathToFile));
    // console.log(path.parse(pathToFile));

    //Readline
   const rlInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const name = await rlInstance.question('Name?');
    console.log(`Your name is ${name}`);
    process.exit(0)
}

void func();

// console.log(__dirname);
// console.log(__filename);