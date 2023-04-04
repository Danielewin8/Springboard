const fs = require('fs');
const axios = require('axios');
const process = require('process');

const argv = process.argv;

function readFile(path) {
    fs.readFile(path, "utf8", function (error, data) {
        if (error) {
            console.error(`Cannot read file: ${path}: ${error}`);
            process.exit(1);
        }
        data = data.split("\n")
        getURL(data);
    })
}

async function getURL(data, next) {
    for (url of data) {
        if (url !== ' ') {
            try {
                let response = await axios.get(url);
                writeFile(url, response.data);
            }
            catch (error) {
                console.error(`${url} is not valid.`);
            }
        }
    }
}

function writeFile(url, response, next) {
    const page = url.split('/')
    try {
        fs.writeFile(page[2], response, function (error) {
            if (error) {
                console.error("Error!");
                process.exit(1);
            }
            console.log(`Wrote to ${page[2]}`)
        })
    }
    catch (error) {
        console.error(`Couldn't write to ${page[2]}`)
    }
}

readFile(argv[2])