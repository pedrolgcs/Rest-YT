// dependencia de tests
import test from 'ava'
// import basic configs
const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

// method for create category
const create = () => categories.save('category-test')

// deleta os dados na tabela antes de executar os tests
test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
// executa depois que todos os tests forem executados, realizando uma limpeza na tabela
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

test('Criação de Categoria', async t => {
  const result = await create()
  t.is(result.category.name, 'category-test')
})

test('atualização de Categoria', async t => {
  await create()
  const updated = await categories.update(1, 'category-test-updated')
  t.is(updated.category.name, 'category-test-updated')
  t.is(updated.affectedRows, 1)
})

test('remoção de Categoria', async t => {
  await create()
  const removed = await categories.del(1)
  t.is(removed.affectedRows, 1)
})
