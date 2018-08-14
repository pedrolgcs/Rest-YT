// importando categories
const db = require('../services/mysql')
// importa modulo de categories
const categories = require('./modules/categories')

// rotas de categories
const routes = (server) => {
  // routes for categories
  categories(server)
  // -------------- AUTHENTICATE --------------
  server.post('/autenticacao', async (req, res, next) => {
    try {
      const { email, password } = req.params
      res.send(200, await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
  // -------------- HOME --------------
  server.get('/', (req, res, next) => {
    res.send('enjoy the silence...')
    next()
  })
}

module.exports = routes
