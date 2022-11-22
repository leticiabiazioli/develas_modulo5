const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;

const red = "\033[31m";
const branco = "\033[0;37m";
const verde = "\033[0;32m";

async function consultarPedido(cpf) {
    const diretorioPedido = path.join(__dirname, 'pedidos.json');
    const pedidoStr = await fsPromise.readFile(diretorioPedido, 'utf-8');
    const pedidos = JSON.parse(pedidoStr);

    const visualizarPedido = pedidos.find(pedido => pedido.cpf === cpf);

    if (visualizarPedido) {
        console.log(`${verde}Encontramos seu pedido:${branco}`, visualizarPedido, '\n');

    } else {
        return console.log(`\n ${red}=============================================${branco}\n`,
            'Pedido não encontrado, tente novamente!!!', `\n ${red}=============================================${branco}\n`);
    };
};

module.exports = consultarPedido;