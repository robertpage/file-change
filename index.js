// const fs = require('fs-extra'); // https://github.com/jprichardson/node-fs-extra
const atom = require('atomically'); // https://github.com/fabiospampinato/atomically#readme
const strman = require('strman'); // https://github.com/dleitee/strman
const  glob = require("fast-glob") // https://www.npmjs.com/package/fast-glob

init();

async function init () {
    const fileList = await glob("./cardsfolder/**/*.txt") // glob(patterns, [options])
    for (let i = 0; i < fileList.length; i++) {
        const str = await atom.readFile( fileList[i], 'utf8' );
        let updatedString = await replace(str, 'Types:Creature', 'Types:Legendary Creature');
        await atom.writeFile( fileList[i], updatedString );

    }
}

function replace (string, target, newString) {
    return new Promise((resolve, reject) => {
        try {
            const result = strman.replace(string, target, newString)
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}