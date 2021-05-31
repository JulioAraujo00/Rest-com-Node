const express = require('express') // importa o express

const app = express() //instancia o express

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

app.get('/atendimentos', (req, res) =>res.send('Você está na rota de Atendimentos'))