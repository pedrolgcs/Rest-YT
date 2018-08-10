// module for crypt password
const sha1 = require('sha1')
// CRUD methods for users
const users = deps => {
  return {
    // return all users
    all: () => {
      return new Promise((resolve, reject) => {
        deps.connection.query('SELECT id, email from users', (error, results) => {
          // verifico se existe algum erro
          if (error) {
            deps.errorHandler(error, 'Falha ao listar usuarios', reject)
            return false
          }
          resolve({ users: results })
        })
      })
    },
    // save user
    save: (email, password) => {
      return new Promise((resolve, reject) => {
        deps.connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, sha1(password)], (error, results) => {
          if (error) {
            deps.errorHandler(error, `Falha ao ${email}`, reject)
            return false
          }
          resolve({ user: { id: results.insertId, email }, affectedRows: results.affectedRows })
        })
      })
    },
    update: (id, password) => {
      return new Promise((resolve, reject) => {
        deps.connection.query('UPDATE users set password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
          if (error || !results.affectedRows) {
            deps.errorHandler(error, `Falha ao atualizar o usuario de ID ${id}`, reject)
            return false
          }
          resolve({ user: { id }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        deps.connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            deps.errorHandler(error, `Falha ao deletar usuario de ID ${id}`, reject)
            return false
          }
          resolve({ user: {id}, message: 'Usuario removido com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = users
