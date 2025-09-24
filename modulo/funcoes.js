/*************************************************************************************************
 *  Objetivo: Arquivo de funções para gerenciar a API do whatsapp.
 *  Data: 24/09/2025
 *  Autor: Gabryel Fillipe
 *  Versão: 1.0
 *************************************************************************************************/
const dados = require('./contatos.js')

const MESSAGE_ERRO = {
    status: false,
    status_code: 500,
    development: "Gabryel Fillipe Cavalcanti da Silva"
}


function findAllUsers(){
    let info = dados.contatos['whats-users']
    

    let user = {
        status: true,
        status_code: 200,
        development: 'Gabryel Fillipe Cavalcanti da Silva',
        users: info
    }

    if(user.users.length > 0)
    return user
    else
    return MESSAGE_ERRO
}
console.log(findAllUsers())