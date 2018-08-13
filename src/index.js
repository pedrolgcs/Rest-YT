require('dotenv').config()
// importo o server
const server = require('./server')
// passo a porta
server.listen(process.env.PORT)
