const readline = require('readline');
const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;
const novoCadastro = require('./cadastroCliente');
const novoPedido = require('./fazerPedido');
const consultarPedidoCompleto = require('./verDetalhes');
const editarPedido = require('./editarPedido');
const consultarPedido = require('./checarStatus');
const cancelarPedido = require('./cancelarPedido');
const validarCPF = require('./validarCPF')

const red = "\033[31m";
const cyan = "\033[0;36m";
const branco = "\033[0;37m";
const verde = "\033[0;32m";

console.log(
    `${red}=======================================================${branco}
Seja bem vindo ao controle de pedidos da ${verde}LANCHONETE 847${branco} 
Número do processo: ${cyan}${process.pid}${branco},
Plataforma do processo: ${cyan}${process.platform}${branco},
Arquitetura do processo:  ${cyan}${process.arch}${branco}
${red}=======================================================${branco} \n`
)

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface.setPrompt(`${verde} ESCOLHA UMA OPÇÃO ${branco}
${verde}1.${branco} Cadastro cliente
${verde}2.${branco} Fazer um pedido 
${verde}3.${branco} Checar o status do seu pedido 
${verde}4.${branco} Ver os detalhes do seu pedido 
${verde}5.${branco} Editar seu pedido 
${verde}6.${branco} Cancelar seu pedido
${verde}7.${branco} Encerrar a aplicação ${branco} \n`);

interface.prompt();

function question(str) {
    return new Promise(resolve =>
    (interface.question(str, resolve)
    ));
};

interface.on('line', async opcaoEscolhida => {
    console.clear();
    switch (opcaoEscolhida) {
        case '1': {
            const cpf = await question('Vamos precisar de alguns dados, digite o seu CPF: ');
            if (validarCPF(cpf)) {
                const nome = await question('Digite o seu nome: ');
                const endereco = await question('Digite o seu endereço: ');
                const telefone = await question('Digite o seu telefone: ');
                await novoCadastro(cpf, nome, endereco, telefone);
            }
            else {
                console.error(`${red}CPF INVÁLIDO. TENTE NOVAMENTE.${branco}\n`)
            }
            break;
        }
        case '2': {
            const cpf = await question('Digite o seu CPF: ');
            const diretorioCliente = path.join(__dirname, 'clientes.json');
            const dadosClienteStr = await fsPromise.readFile(diretorioCliente, 'utf-8');
            const dadosCliente = JSON.parse(dadosClienteStr);
            const acharCliente = dadosCliente.find(cliente => cliente.cpf === cpf);

            if (!acharCliente) {
                console.log(`${red}Cliente não cadastrado!${branco}`);
            }
            else {
                const combo = await question(`
                 ${red}~~~ MENU ~~~${branco}
        
${red}1.${branco} Sanduíche bovino + Batata Frita + Refrigerante
${red}2.${branco} Sanduíche de frango + Batata Frita + Refrigerante
${red}3.${branco} Sanduíche vegetariano + Batata Frita + Refrigerante 
        
${cyan}Digite o número do combo escolhido:${branco}\n`)

                await novoPedido(cpf, combo);
            }
            break;
        }
        case '3': {
            const cpf = await question('Digite o seu CPF: ');
            await consultarPedido(cpf);
            break;
        }
        case '4': {
            const cpf = await question('Digite o seu CPF: ');
            await consultarPedidoCompleto(cpf);
            break;
        }
        case '5': {
            const cpf = await question('Digite o seu CPF: ');
            await editarPedido(cpf, question);
            break;
        }
        case '6': {
            const cpf = await question('Digite o seu CPF: ');
            await cancelarPedido(cpf, question);
            break;
        }
        case '7': {
            console.log(`${verde}Volte sempre à LANCHONETE 847.${branco}`);
            process.exit(opcaoEscolhida);
        }
        default: {
            console.log(`${red}Você digitou uma opção inválida. Tente novamente!\n`);
            break;
        }
    }
    interface.prompt();
});