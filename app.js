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

app.get('/v1/users', function(request,response){

    let users = dados.getAllUsers()

    response.status(users.status_code).json(users)
})


//Start na API
app.listen(PORT, function () {
    console.log('API aguardando requisições ...')
})