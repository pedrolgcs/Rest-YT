// module for crypt password
const sha1 = require('sha1')
// token
const jwt = require('jsonwebtoken')
// module for authenticate
const auth = deps => {
  return {
    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        const queryString = 'SELECT id, email FROM users WHERE email = ? AND password = ?'
        const queryData = [email, sha1(password)]
        deps.connection.query(queryString, queryData, (error, results) => {
          if (error || !results.length) {
            deps.errorHandler(error, 'Falha ao localizar usuário', reject)
            return false
          }
          // pegando o primeiro resultado da consulta
          const { email, id } = results[0]
          // criando o token para 24h
          const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: '24h' })
          resolve({ token: token })
        })
      })
    }
  }
}
module.exports = auth
