// dependencia de tests
import test from 'ava'
// import basic configs
const { connection, errorHandler } = require('./setup')

// importa o modulo de categories
const users = require('../users')({ connection, errorHandler })

// method for create category
const create = () => users.save('user@gmail.com', 'password')

// deleta os dados na tabela antes de executar os tests
test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
// executa depois que todos os tests forem executados, truncando a tabela categories
test.after.always(t => connection.query('TRUNCATE TABLE users'))

// create test
test('Criação de Usuário', async t => {
  const result = await create()
  t.is(result.user.email, 'user@gmail.com')
})

// list users
test('Lista de Usuários', async t => {
  await create()
  const list = await users.all()
  t.is(list.users.length, 1)
  t.is(list.users[0].email, 'user@gmail.com')
})

// update user
test('Update de Usuário', async t => {
  const insert = await create()
  const updated = await users.update(insert.user.id, 'password-update')
  t.is(updated.affectedRows, 1)
})

// remove user
test('Remoção de Usuario', async t => {
  const insert = await create()
  const removed = await users.del(insert.user.id)
  t.is(removed.user.id, insert.user.id)
  t.is(removed.affectedRows, 1)
})
