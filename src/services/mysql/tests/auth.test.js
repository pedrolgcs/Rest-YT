// dependencia de tests
import test from 'ava'
// import basic configs
const { connection, errorHandler } = require('./setup')

// importa o modulo de categories
const users = require('../users')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })

// method for create category
const create = () => users.save('user@gmail.com', 'password')

// deleta os dados na tabela antes de executar os tests
test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
// executa depois que todos os tests forem executados, truncando a tabela categories
test.after.always(t => connection.query('TRUNCATE TABLE users'))

// auth de users
test('Login de Usuário - Sucesso', async t => {
  await create()
  // busco esse usuario no banco
  const result = await auth.authenticate('user@gmail.com', 'password')
  t.not(result.token, null)
  t.not(result.token.length, 0)
})

test('Login de Usuário - Falha', async t => {
  await create()
  // busco esse usuario no banco
  const promise = auth.authenticate('user2@gmail.com', 'password')
  const error = await t.throws(promise)
  t.is(error.error, 'Falha ao localizar usuário')
})
