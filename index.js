const fsPromises = require('node:fs/promises');
const path = require('node:path');


const foobar = async () => {

    //Створення базової папки та 5 підпапок з 5 файлами в кожній
    const basePath = path.join(__dirname, 'baseFolder');
    const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    await fsPromises.mkdir(basePath, {recursive: true});

    for (const folder of folders) {
        const folderPath = path.join(basePath, folder);
        await fsPromises.mkdir(folderPath, {recursive: true});

        for (let i = 1; i < 6; i++) {
            await fsPromises.writeFile(
                path.join(folderPath, `file${i}.txt`),
                `This is file ${i} in ${folder}`
            )
        }
    }

    // Вивід шляху до кожної папки та файлів + інформація про те, чи є це файл чи папка.
    const items = await fsPromises.readdir(basePath, {withFileTypes: true});

    for (const item of items) {
        const itemPath = path.join(basePath, item.name);

        const stats = await fsPromises.stat(itemPath);

        console.log(
            itemPath,
            stats.isDirectory() ? '- folder' : '- file'
        );

        if (item.isDirectory()) {
            const files = await fsPromises.readdir(itemPath);

            for (const file of files) {
                const filePath = path.join(itemPath, file);

                const fileStats = await fsPromises.stat(filePath);

                console.log(
                    filePath,
                    fileStats.isDirectory() ? '- folder' : '- file'
                );
            }
        }
    }


}

void foobar()