// // Requisição .get dos dados da minha conta no servidor da API do github...
// axios.get('https://api.github.com/users/2504Guimaraes')

// .then(resposta => { 
//     console.log(listaCompleta(resposta.data));
// })

// // Como  o objeto XMLhttprequest(AJAX) é assíncrono
// // a minha função "listaCompleta" dos dados do usuário
// // pode ser escrita depois da minha requisição .get,
// // pois as informações pedidas são feitas de forma
// // intermitente.

// function listaCompleta(dados_usuario){
//     return dados_usuario;
// }


// var Usuario = {
// 	'id': 72200849,
//   	'nome':'Ivan Guimarães',
//   	'idade': 20,
//   	'peso-kg': 65,
//     'cidade-UF':'xxxxxx-SP',
//     'faculdade':'xxxxxxx-xxxxxxx-xxxxxxx',
//     'Curso Técnico': 'xxxxx-xxxxx-xxxxx',
//     'nascimento' : '25/04/1999',
//     'sexo': 'masculino',
//     'CEP': '00000-000',
// }

// Função escrita da maneira padrão...

// function dadosUsuario(UserSearched){
//     for (var dataUser in UserSearched){
//         console.log(dataUser + ': ' ,UserSearched[dataUser])
//     }
// }
//dadosUsuario(Usuario);


// NOTA: "CTRL + ;" comenta o texto igual o "CTRL + K, CTRL + C" . Além disso ele também faz  o txt voltar ao normal!!!

// Vendo como funçõe Arrow funcionam mais eventos setTimeout....

// var dadosUsuarioArrow = (UserSearched) => {
//     for(var dataUser in UserSearched){
//         console.log(dataUser + ': ', UserSearched[dataUser])
//     }
// }

// // Testando funções com o método settimeout...
// const showUser = (Usuario != undefined) ? setTimeout(() => {
//     console.log('Espere 5 segundos...');
//     setTimeout(() => { dadosUsuarioArrow(Usuario) }, 5000);
// }, 0) : console.log('Usuário não encontrado');








//---------------- DESAFIO: Exercício 01: -----------------------//

// Crie uma função que recebe a idade de um usuário e retorna uma Promise que depois de 2
// segundos retornará se usuário é maior ou não que 18 anos. Se o usuário ter mais que 18 anos de
// idade o resultado deve cair no .then, caso contrário, no .catch


// var idade = 20;

// function checaIdade(idade){
//     return new Promise((sucesso, fracasso) => {
//         setTimeout(() =>{
//             console.log('Arguarde 2 segundos...');
//             setTimeout(() => {
//                 if(idade >= 18){
//                     sucesso('Usuário maior de idade :D');
//                 } else{
//                     fracasso('Usuário menor de idade :P');
//                 }
//             }, 2000);
//         } , 0);
//     });
// }

// checaIdade(idade)
//     .then((resposta) => {
//         console.log(resposta);
//     })
//     .catch((erro) => {
//         console.log(erro);
//     })


//---------------- DESAFIO: Exercício 01: MODIFICADO -----------------------//

// var Usuario = {
// 	'id': 72200849,
//   	'nome':'Ivan Guimarães',
//   	'idade': 20,
//     'cidade-UF':'xxxxxx-SP',
//     'faculdade':'xxxxxxx-xxxxxxx-xxxxxxx',
//     'Curso Técnico': 'xxxxx-xxxxx-xxxxx',
//     'Outra Graduação': 'xxx-xxx-xxx',
//     'nascimento' : '25/04/1999',
//     'sexo': 'masculino',
//     'CEP': '00000-000',
// }

// function checkingUserAge(UserTyped){
//     return new Promise((success, failure) => {
//         setTimeout(() => {
//             console.log('Aquarde 2 segundos...');
//             setTimeout(() => {
//                 for (var userData in UserTyped) {
//                     if (userData === 'idade'){
//                         if (UserTyped[userData] >= 18){
//                             console.log(userData + ': ', UserTyped[userData] + ' anos');
//                             success('Usuário maior de 18 anos :D');
//                         } else{
//                             console.log(userData + ': ', UserTyped[userData]);
//                             failure('Usuário menor de 18 anos :P');
//                         }
//                     }
//                 }
//             }, 2000);
//         }, 0);
//     });
// }


// checkingUserAge(Usuario)
// .then((resposta) => {
//     console.log(resposta);
// })
// .catch((erro) => {
//     console.log(erro);
// })


//-------------------- DESAFIO: Exercício 02 e 03: -----------------------//

// 2º exercício
// Crie uma tela com um <input> que deve receber o nome de um usuário no Github. Após digitar o
// nome do usuário e clicar no botão buscar a aplicação deve buscar pela API do Github (conforme
// URL abaixo) os dados de repositórios do usuário e mostrá-los em tela:
// URL de exemplo: https://api.github.com/users/diego3g/repos
// Basta alterar "diego3g" pelo nome do usuário.



// lista de nomes dos repositórios...
var listaRepositorios = [];


// 1. Variáveis do input e do botão...
var inputElement = document.querySelector('input#nome-usuario');
var btnElement = document.querySelector('button#botao-nome');
var containerElement = document.querySelector('div#container');
var listElementMessage = document.createElement('ul');
var listError = document.createElement('ul');

// criada a minha lista de repositorios...
var listElement = document.createElement('ul');
listElement.setAttribute('id', 'lista-de-repositorios');


//2. Pegar o nome digitado no input ao clicar do botão...
btnElement.addEventListener('click', () => {
    var userRequested = inputElement.value;

    // 8. Ao novo click, esvaziar a lista de repositórios e a de elementos... Fim do exercício :D
    listaRepositorios = [];
    listElement.innerHTML = "";
    listError.innerHTML = "";
    
    // 3. Fazer a requisição desse nome digitado, SE ele existir
    // e fazer o método GET pedindo a info. para o servidor/host.
    axios.get('https://api.github.com/users/' + userRequested + '/repos')
        .then((success) => {
            
            // 10. Adicionar tempo de carregamento, e enquanto ele acontece,
            // adicionar mensagem para avisar ao usuário q o conteúdo está carregando... 
            carregarMensagemDeEspera();
            setTimeout(() => {
                    
               // 5. Retornar nome dos Repositórios caso sucesso/usuário encontrado....
                    // showRepositores(success.data);
                    showRepositores(success.data);

            }, 3000);

            //6.A apagar o nome escrito no input...
            inputElement.value = "";
            
        })
        .catch((error) => {
            
            console.log(error);

            // 13. Caso o usuário não exista, adicionar mensagem de erro na tela...
            // ao invés do callback padrão a partir do erro da requisição...
            buildErrorMessage();

            //6.B apagar o nome escrito no input...
            inputElement.value = "";
        });
})


// 4. função achar nome dos repositórios do Usuário...
function showRepositores(usuario_repositorios) {

    // 11. Apaga a menssagem de carregamento...
    listElementMessage.innerHTML = "";

    for( var repositorio in usuario_repositorios) {
        for (var name in usuario_repositorios[repositorio]) {
            if(name === 'full_name') {

                // Valor dos nomes é enviado para o meu array de nomes de repositórios ...
                listaRepositorios.push(usuario_repositorios[repositorio][name]);
            }
        } 
    }

    showRepoNamesInList();
}

// 6. função pegar os nomes dos repositórios achados e armazena-los em uma lista.
function showRepoNamesInList() {

    // pelo tamanho da minha lista de nomes de Repositórios, criar
    // indices dessa lista com os nomes já armazenados dentro...
    for (var nome of listaRepositorios) {
        var indexList = document.createElement('li');
        indexList.setAttribute('class', 'indice-lista-repositorios');
        indexList.append(nome);
        listElement.appendChild(indexList);
    }

    // 7. Por a lista de repositórios dentro da tela...
    containerElement.appendChild(listElement);

}


// 9. Adicionar mensagem en formato de texto html enquanto o evento setTimeout ocorre
// para depois mostrar a lista de repositórios na tela...
function carregarMensagemDeEspera() {
    var messageElement = document.createElement('li');

    messageElement.append('Carregando...');
    listElementMessage.appendChild(messageElement);
    containerElement.appendChild(listElementMessage);
}

// 12. Montar mensagem de erro caso usuário não exista...
function buildErrorMessage() {
    var ErrorMessage = document.createElement('li');
    ErrorMessage.append('ERRO 404: Usuário não encontrado... :(');
    listError.appendChild(ErrorMessage);
    containerElement.appendChild(listError);
}