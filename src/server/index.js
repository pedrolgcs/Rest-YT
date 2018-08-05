// importo o restify
const restify = require('restify')
// crio o servidor
const server = restify.createServer({
  name: 'curso_restify',
  version: '1.0.0'
})
// import o metodo de rotas
const routes = require('../http/routes')
// importo o cors
const cors = require('./cors')

// chamada do método cors
server.pre(cors.preflight)
server.use(cors.actual)
// plugin para passar parametros
server.use(restify.plugins.bodyParser())

// passo as rotas para o server
routes(server)

module.exports = server
