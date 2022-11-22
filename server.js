const http = require('http');
const server = http.createServer();
const fsPromise = require('fs').promises;
const path = require('path')

server.on('request', async (req, res) => {
    const filePath = path.join(__dirname, 'pedidos.json');
    const pedidos = await fsPromise.readFile(filePath, 'utf-8');
    res.write(pedidos);
    res.end();
})

server.listen(8080);