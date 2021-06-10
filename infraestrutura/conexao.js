const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password:'d26m0402',
  database:'agendamento_bravo'
})
module.exports = conexao