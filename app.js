/******************************************************************************************************************************
 * Objetivo: emdPoints referente a API do Whatsapp.
 * Autor: Gabryel Fillipe
 * Data: 15/09/2025
 * Versão: 1.0
 * 
 * Observações: Instalações do Express, Cors, Body-Parser
 * npm install express     --save
 * npm install cors        --save
 * npm install body-parser --save
 *****************************************************************************************************************************/

// Importando dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Importanto funções da API
const dados = require('./modulo/funcoes')

// Retorna a porta do servidor atual ou coloca uma porta local
const PORT = process.PORT || 8080

// Criando uma Instancia de uma classe do express
const app = express()

//Configuração de permissões
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')    //Servidor de origem da API
    response.header('Acess-Control-Allow-Methods', 'GET') //Verbos permitidos na API
    // Carrega as configurações no CORS da API
    app.use(cors())
    next() // Próximo, carregar os proximos endPoints
})

// ENDPOINTS

app.get('/v1/whatsapp/users', function (request, response) {

    // Pesquisando na Função de listar todos os users
    let users = dados.getAllUsers()

    response.status(users.status_code).json(users)
})

app.get('/v1/whatsapp/users/:telefone', function (request, response) {
    let user = request.params.telefone

    // Pesquisando dados de um user na função
    let dadosUser = dados.getDadosByUser(user)

    response.status(dadosUser.status_code).json(dadosUser)
})

app.get('/v1/whatsapp/user/contatos/:telefone', function (request, response) {
    let user = request.params.telefone

    // Pesquisando contatos de um usuario
    let contatos = dados.getContatosByUser(user)

    response.status(contatos.status_code).json(contatos)

})

app.get('/v1/whatsapp/user/message/:user', function (request, response) {
    let user = request.params.user

    // Pesquisando mensagens de um usuario
    let message = dados.getMessageByUser(user)

    response.status(message.status_code).json(message)
})

app.get('/v1/whatsapp/user/mensagem/contato', function (request, response) {
    // Criando variaveis para receber dados da query de pesquisa
    let user = request.query.user

    let contato = request.query.contato

    // Pesquisando mensagem de um contato em especifico
    let mensagemContato = dados.getContactMessageByUser(user, contato)

    response.status(mensagemContato.status_code).json(mensagemContato)
})

app.get('/v1/whatsapp/user/mensagem/contato/filter', function (request, response) {
    // Criando variaveis para receber dados da query de pesquisa
    let user = request.query.user

    let contato = request.query.contato

    let palavraChave = request.query.palavraChave

    // Pesquisando mensagens de um contato que tenha a palavra chave desejada
    let mensagensFiltradas = dados.filterContactMessage(user,contato,palavraChave)

    response.status(mensagensFiltradas.status_code).json(mensagensFiltradas)
})

//Start na API
app.listen(PORT, function () {
    console.log('API aguardando requisições ...')
})