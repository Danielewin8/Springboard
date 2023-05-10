const fs = require('fs');
const process = require('process')
const axios = require('axios')

function optionalOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function (err) {
            if (err) {
                console.error(`${out} is invalid: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`${path} is invalid: ${err}`);
            process.exit(1);
        }
        else {
            optionalOutput(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        let response = await axios.get(url);
        optionalOutput(response.data, out);
    }
    catch (err) {
        console.error(`${url} error: ${err}`);
        process.exit(1);
    }
}
let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
    webCat(path, out);
}
else {
    cat(path, out);
}