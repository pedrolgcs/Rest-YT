// variaves de ambiente
require('dotenv').config()
// database mysql
const mysqlServer = require('mysql')

// db connection
const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_TEST_DATABASE
})

// funcao para tratar errors
const errorHandler = (error, msg, rejectFunction) => {
  // e indicado salvar o error em um log
  console.log(error)
  rejectFunction({ error: msg })
}

module.exports = { connection, errorHandler }
