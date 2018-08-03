// importo o restify
const restify = require('restify')
// crio o servidor
const server = restify.createServer()
// import o metodo de rotas
const routes = require('../http/routes')
// importo o cors
const cors = require('./cors')

// chamada do método cors
server.pre(cors.preflight)
server.use(cors.actual)

// passo as rotas para o server
routes(server)

module.exports = server
