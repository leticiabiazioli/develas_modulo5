const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;

class CadastroCliente {
    constructor(cpf, nome, endereco, telefone) {
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }
};

async function novoCadastro(cpf, nome, endereco, telefone) {
    const diretorioCliente = path.join(__dirname, 'clientes.json');
    const novoCadastro = new CadastroCliente(cpf, nome, endereco, telefone);
    const dadosClienteStr = await fsPromise.readFile(diretorioCliente, 'utf-8');
    const dadosCliente = JSON.parse(dadosClienteStr);
    dadosCliente.push(novoCadastro);
    await fsPromise.writeFile(diretorioCliente, JSON.stringify(dadosCliente));
    console.log('Cadastro concluído com sucesso! Bora comer?\n')
}

module.exports = novoCadastro;