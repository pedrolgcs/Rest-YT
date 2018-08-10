// CRUD methods for categories
const categories = deps => {
  return {
    // return all categories
    all: () => {
      return new Promise((resolve, reject) => {
        // const { connection } = deps
        deps.connection.query('SELECT * from categories', (error, results) => {
          // verifico se existe algum erro
          if (error) {
            deps.errorHandler(error, 'Falha ao listar as categorias', reject)
            return false
          }
          resolve({ categories: results })
        })
      })
    },
    // save categorie
    save: (name) => {
      return new Promise((resolve, reject) => {
        deps.connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
          if (error) {
            deps.errorHandler(error, `Falha ao inserir a categoria ${name}`, reject)
            return false
          }
          resolve({ category: { name, id: results.insertId } })
        })
      })
    },
    // update categorie
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        deps.connection.query('UPDATE categories set name = ? WHERE id = ?', [name, id], (error, results) => {
          if (error || !results.affectedRows) {
            deps.errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
            return false
          }
          resolve({ category: { name, id }, affectedRows: results.affectedRows })
        })
      })
    },
    // delete categorie
    del: (id) => {
      return new Promise((resolve, reject) => {
        deps.connection.query('DELETE from categories WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            deps.errorHandler(error, `Falha ao deletar categoria de id ${id}`, reject)
          }
          resolve({ category: {id}, message: 'Categoria removida com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = categories
