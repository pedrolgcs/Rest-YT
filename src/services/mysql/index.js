const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'pedro',
  password: '123',
  database: 'restful_ws'
})

// passo a connection como dependica para categories
const categoryModule = require('./categories')({ connection })

module.exports = {
  categories: () => categoryModule
}
