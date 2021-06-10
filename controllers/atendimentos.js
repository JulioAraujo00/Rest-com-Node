// ROTA ATENDIMENTOS
const Atendimento = require('../models/atendimentos.js')
module.exports = app => { 
  app.get('/atendimentos', (req, res) =>res.send('Você está na rota de Atendimentos e está realizando um  get')) //Recebe os dados

  app.post('/atendimentos', (req,res) => {
    const atendimento = req.body
    Atendimento.adiciona(atendimento)
    res.send('Você está na rota de atendimentos e está realizando um post')
  })
}