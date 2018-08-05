// CRUD methods for categories
const categories = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        // const { connection } = deps
        deps.connection.query('SELECT * from categories', (error, results) => {
          if (error) {
            reject(error)
          }
          resolve({ categories: results })
        })
      })
    },
    save: (name) => {},
    update: (id, name) => {},
    del: (id) => {}
  }
}

module.exports = categories
