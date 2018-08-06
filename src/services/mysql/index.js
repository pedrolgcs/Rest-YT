const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'pedro',
  password: '123',
  database: 'restful_ws'
})

// funcao para tratar errors
const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)
  rejectFunction({ error: msg })
}

// passo a connection e o errorHandler como dependica para categories
const categoryModule = require('./categories')({ connection, errorHandler })

module.exports = {
  categories: () => categoryModule
}
