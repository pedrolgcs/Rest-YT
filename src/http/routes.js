// crio as rotas
const routes = (server) => {
  server.get('/', (req, resp, next) => {
    resp.send('enjoy the silence...')
    next()
  })
}

module.exports = routes
