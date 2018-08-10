// dependencia de tests
import test from 'ava'
// import basic configs
const { connection, errorHandler } = require('./setup')

// importa o modulo de categories
const categories = require('../categories')({ connection, errorHandler })

// method for create category
const create = () => categories.save('category-test')
// const update = () => categories.update(1, 'category-test-updated')

// deleta os dados na tabela antes de executar os tests
test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
// executa depois que todos os tests forem executados, truncando a tabela categories
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

// create test
test('Criação de Categoria', async t => {
  const result = await create()
  t.is(result.category.name, 'category-test')
})

// list categories
test('Lista de Categorias', async t => {
  await create()
  const list = await categories.all()
  t.is(list.categories.length, 1)
  t.is(list.categories[0].name, 'category-test')
})

// update category
test('atualização de Categoria', async t => {
  const insert = await create()
  const updated = await categories.update(insert.category.id, 'category-test-updated')
  t.is(updated.category.name, 'category-test-updated')
  t.is(updated.affectedRows, 1)
})

// remove category
test('remoção de Categoria', async t => {
  const insert = await create()
  const removed = await categories.del(insert.category.id)
  t.is(removed.category.id, insert.category.id)
  t.is(removed.affectedRows, 1)
})
