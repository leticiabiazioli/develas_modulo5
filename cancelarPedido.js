const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;

const cyan = "\033[0;36m";
const red = "\033[31m";
const branco = "\033[0;37m";
const verde = "\033[0;32m";

async function cancelarPedido(cpf, question) {
    const diretorioPedido = path.join(__dirname, 'pedidos.json');
    const pedidoStr = await fsPromise.readFile(diretorioPedido, 'utf-8');
    const pedidos = JSON.parse(pedidoStr);
    const visualizarPedido = pedidos.find(pedido => pedido.cpf === cpf);

    if (visualizarPedido) {
        const confirmacao = await question(`${verde} Este é o pedido que deseja deletar? ${JSON.stringify(visualizarPedido)} ${branco}
        ${verde}1.${branco} SIM
        ${red}2.${branco} NÃO\n`);

        if (confirmacao == 1) {
            const novaListaPedidos = pedidos.filter(pedido => pedido.cpf !== cpf);
            await fsPromise.writeFile(diretorioPedido, JSON.stringify(novaListaPedidos));
            console.log(`\n ${cyan} Pedido cancelado com sucesso. ${branco}\n`);
        }
        else if (confirmacao == 2) {
            console.log(`\n ${verde} Tudo bem. Seu pedido continua em preparação. ${branco}\n`);
        }
        else {
            console.log(`\n ${red} Você digitou uma opção inválida. ${branco}\n`);
        }
    } else {
        console.log(`\n ${red}=========================================\n`,
            'Pedido não encontrado, tente novamente!!!', `\n =========================================${branco}\n`);
    }
};

module.exports = cancelarPedido;