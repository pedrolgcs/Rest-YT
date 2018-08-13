const mysqlServer = require('mysql')

// db connection
const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

// funcao para tratar errors
const errorHandler = (error, msg, rejectFunction) => {
  // indicado salvar o error em um log
  console.log(error)
  rejectFunction({ error: msg })
}

// take module categorie and users and pass for routes
const categoryModule = require('./categories')({ connection, errorHandler })
const userModule = require('./users')({ connection, errorHandler })
const authModule = require('./auth')({ connection, errorHandler })

// exports modules for routes
module.exports = {
  categories: () => categoryModule,
  users: () => userModule,
  auth: () => authModule
}
