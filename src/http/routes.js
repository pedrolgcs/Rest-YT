// importando categories
const db = require('../services/mysql')

// rotas de categories
const routes = (server) => {
  // return categories
  server.get('/categoria', async (req, res, next) => {
    try {
      res.send(200, await db.categories().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })
  // insert category
  server.post('/categoria', async (req, res, next) => {
    const { name } = req.params
    try {
      res.send(200, await db.categories().save(name))
    } catch (error) {
      res.send(400, error)
    }
    next()
  })
  // update category
  server.put('/categoria', async (req, res, next) => {
    const { id, name } = req.params
    try {
      res.send(201, await db.categories().update(id, name))
    } catch (error) {
      res.send(400, error)
    }
    next()
  })
  // delete category
  server.del('/categoria', async (req, res, next) => {
    const { id } = req.params
    try {
      res.send(200, await db.categories().del(id))
    } catch (error) {
      res.send(404, error)
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
