// importo o server
const server = require('./server')
// passo a porta
server.listen('3000')

console.log(server.address())
