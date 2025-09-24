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

// Função para buscar todos os usuários
function getAllUsers() {
    let info = dados.contatos['whats-users']


    let user = {
        status: true,
        status_code: 200,
        development: 'Gabryel Fillipe Cavalcanti da Silva',
        users: info
    }

    if (user.users.length > 0)
        return user
    else
        return MESSAGE_ERRO
}

// Função para buscar os dados de um usuário
function getDadosByUser(telefone) {
    const number = telefone

    let informacoesUsuario = dados.contatos['whats-users'].find(user => user.number === number)

    if (informacoesUsuario == undefined) {
        return MESSAGE_ERRO
    } else {
        let account = informacoesUsuario.account
        let nickname = informacoesUsuario.nickname
        let foto = informacoesUsuario['profile-image']
        let number = informacoesUsuario.number
        let background = informacoesUsuario.background
        let criacao = informacoesUsuario['created-since'].start
        let encerramento = informacoesUsuario['created-since'].end

        let usuarioSelecionado = {
            status: true,
            status_code: 200,
            development: 'Gabryel Fillipe Cavalcanti da Silva',
            account: account,
            nickname: nickname,
            number: number,
            foto: foto,
            background: background,
            criacao: criacao,
            encerramento: encerramento
        }
        return usuarioSelecionado
    }

}

// Função para buscar todos os contatos de um usuário
function getContatosByUser(telefone) {
    const number = telefone

    let informacoesUsuario = dados.contatos['whats-users'].find(user => user.number === number)

    let user = informacoesUsuario.nickname

    let contatos = informacoesUsuario.contacts

    let contatosUser = {
        status: true,
        status_code: 200,
        development: 'Gabryel Fillipe Cavalcanti da Silva',
        user: user,
        contatos: []
    }

    contatos.forEach(function (item) {
        contatosUser.contatos.push({
            name: item.name,
            number: item.number,
            image: item.image,
            descricao: item.description
        })
    })

    if (contatosUser.contatos.length > 0)
        return contatosUser
    else
        return MESSAGE_ERRO


}

// Função para buscar todas as mensagens de um usuário
function getMessageByUser(telefone) {
    const number = telefone

    let informacoesUsuario = dados.contatos['whats-users'].find(user => user.number === number)

    let user = informacoesUsuario.nickname

    let contato = informacoesUsuario.contacts

    let messageUser = {
        status: true,
        status_code: 200,
        development: 'Gabryel Fillipe Cavalcanti da Silva',
        user: user,
        contatos: []
    }

    contato.forEach(function (item) {
        messageUser.contatos.push({
            name: item.name,
            message: item.messages
        })
    })

    if (messageUser.contatos.length > 0)
        return messageUser
    else
        return MESSAGE_ERRO
}

// Função para busacr mensagens entre um usuário e um contato
function getContactMessageByUser(telefone, contato) {
    const number = telefone

    let informacoesUsuario = dados.contatos['whats-users'].find(user => user.number === number)

    let informacoesContato = informacoesUsuario.contacts.find(contact => contact.name === contato)

    if (informacoesContato == undefined) {

        return MESSAGE_ERRO
    }
    else {
        let user = informacoesUsuario.nickname

        let message = informacoesContato.messages

        let contactMessageUser = {
            status: true,
            status_code: 200,
            development: 'Gabryel Fillipe Cavalcanti da Silva',
            user: user,
            contato: contato,
            mensagens: []
        }

        message.forEach(function (item) {
            contactMessageUser.mensagens.push({
                sender: item.sender,
                content: item.content,
                time: item.time
            })
        })

        return informacoesContato
    }

}

// Função para fitrar mensagens a um contato de um usuário
function filterContactMessage(telefone,contato,teste){
    const number = telefone

    let informacoesUsuario = dados.contatos['whats-users'].find(user => user.number === number)

    let informacoesContato = informacoesUsuario.contacts.find(contact => contact.name === contato)

    let mensagens = informacoesContato.messages.find(message => message.content.includes(teste))

    return mensagens
}

// Exportando funções da API
module.exports = {
    getAllUsers,
    getDadosByUser,
    getContatosByUser,
    getMessageByUser,
    getContactMessageByUser,
    filterContactMessage
}

// console.log(getContactMessageByUser('11987876567', 'Ana Maria'))
// console.log(filterContactMessage('11987876567', 'Ana Maria','?'))