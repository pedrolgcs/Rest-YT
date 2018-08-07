const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

// funcao para tratar errors
const errorHandler = (error, msg, rejectFunction) => {
  // e indicado salvar o error em um log
  console.log(error)
  rejectFunction({ error: msg })
}

// passo a connection e o errorHandler como dependica para categories
const categoryModule = require('./categories')({ connection, errorHandler })

module.exports = {
  categories: () => categoryModule
}
