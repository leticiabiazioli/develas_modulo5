const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;

class FazerPedido {
    constructor(cpf, combo) {
        this.cpf = cpf;
        this.combo = combo;
    }
};

const branco = "\033[0;37m"
const verde = "\033[0;32m";

async function novoPedido(cpf, combo) {
    const diretorioPedido = path.join(__dirname, 'pedidos.json');
    const novoPedido = new FazerPedido(cpf, combo);
    const dadosPedidoStr = await fsPromise.readFile(diretorioPedido, 'utf-8');
    const dadosPedido = JSON.parse(dadosPedidoStr);
    dadosPedido.push(novoPedido);
    await fsPromise.writeFile(diretorioPedido, JSON.stringify(dadosPedido));

    console.log(`
    ==============================================================
    ${verde}Pedido recebido, o prazo de entrega é 50 minutos, bom apetite!${branco}
    ==============================================================`)
}

module.exports = novoPedido;