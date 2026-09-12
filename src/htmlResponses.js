const fs = require('fs') // pull in the file system module

// Pages
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const client2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const client3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getPage = (request, response, page, content) => {
    response.writeHead(200, content);
    response.write(page);
    response.end();
}

const getIndex = (request, response) => {
    getPage(request, response, index, {"Content-Type": 'text/html'});
}

const getClient2 = (request, response) => {
    getPage(request, response, client2, {"Content-Type": 'text/html'});
}

const getClient3 = (request, response) => {
    getPage(request, response, client3, {"Content-Type": 'text/html'});
}

module.exports = { getIndex, getClient2, getClient3 };