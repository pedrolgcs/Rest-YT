// importando categories
const db = require('../services/mysql')

// definindo as rotas
const routes = (server) => {
  server.get('/categoria', async (req, res, next) => {
    try {
      res.send(await db.categories().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })
  server.post('/categoria', async (req, res, next) => {
    const { name } = req.params
    try {
      res.send(await db.categories().save(name))
    } catch (error) {
      res.send(error)
    }
    next()
  })
  // server.put('categoria', (req, res, next) => {
  //   res.send()
  //   next()
  // })
  // server.del('categoria', (req, res, next) => {
  //   res.send()
  //   next()
  // })
  // rota de home
  server.get('/', (req, res, next) => {
    res.send('enjoy the silence...')
    next()
  })
}

module.exports = routes
