const fs = require('fs');
const path = require('path');
const fsPromise = fs.promises;

const red = "\033[31m";
const branco = "\033[0;37m";
const verde = "\033[0;32m";

async function consultarPedidoCompleto(cpf) {
    const diretorioPedido = path.join(__dirname, 'pedidos.json');
    const pedidoStr = await fsPromise.readFile(diretorioPedido, 'utf-8');
    const pedidos = JSON.parse(pedidoStr);
    const visualizarPedido = pedidos.find(pedido => pedido.cpf === cpf);
    const diretorioCliente = path.join(__dirname, 'clientes.json');
    const dadosClienteStr = await fsPromise.readFile(diretorioCliente, 'utf-8');
    const clientes = JSON.parse(dadosClienteStr);
    const visualizarCliente = clientes.find(cliente => cliente.cpf === cpf);

    let nomePedido = "";

    if (visualizarPedido.combo == 1) {
        nomePedido = "Combo 1 - Sanduíche bovino + Batata Frita + Refrigerante"
    }
    else if (visualizarPedido.combo == 2) {
        nomePedido = "Combo 2 - Sanduíche de frango + Batata Frita + Refrigerante"
    }
    else if (visualizarPedido.combo == 3) {
        nomePedido = "Combo 3 - Sanduíche vegetariano + Batata Frita + Refrigerante"
    }

    if (visualizarPedido && visualizarCliente) {
        console.log(`${verde}Encontramos seu pedido:${branco}\n
        Nome: ${visualizarCliente.nome}
        CPF: ${visualizarCliente.cpf}
        Endereço: ${visualizarCliente.endereco}
        Telefone: ${visualizarCliente.telefone}
        Pedido: ${nomePedido}\n`);

    } else {
        console.log(`\n ${red}=========================================\n`,
            'Pedido não encontrado, tente novamente!!!', `\n =========================================${branco}\n`);
    }
};

module.exports = consultarPedidoCompleto;