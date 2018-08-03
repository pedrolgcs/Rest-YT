// importo o restify
const restify = require('restify')
// crio o servidor
const server = restify.createServer()
// import o metodo de rotas
const routes = require('../http/routes')
// chamo o metodo de rotas e passo o server
routes(server)

module.exports = server
