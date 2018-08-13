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
// importa o middleware de verificação token
const jwtMiddleware = require('../server/jwtMiddleware')
// rotas que não precisam ser autenticadas pelo token
const exclusions = ['/autenticacao']

// chamada do método cors
server.pre(cors.preflight)
server.use(cors.actual)
// plugin para passar parametros
server.use(restify.plugins.bodyParser())
// mideware de autenticação
server.use(jwtMiddleware({ exclusions }))

// passo as rotas para o server
routes(server)

module.exports = server
