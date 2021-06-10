## REST COM NODE.JS

Aqui vamos criar uma apiRest utilizando o Express e MySQL

**npm init**
**Instalação do express**

**Criação da primeira rota**

Para iniciar, criaremos o index.js. Nele vamos importar o express e criar nossa primeira rota

_Importar o express_:
<const app = require('express')>

_Criando a primeira rota_

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

app.get('/atendimentos', (req,res) => res.send('Você está na rota de Atendimentos!'))

**Atualizando o start no Json**

Na seção de <scripts> do <Json>, vamos facilitar a inicialização do nosso servidor. Para isso, vamos adicionar o comando *start* nessa seção:

 "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }

Agora, para iniciar o servidor, podemos rodar o seguinte comando:

npm start

**Nodemon**
<npm install --save-dev nodemon>   //O --save-dev serve para criar uma dependência a parte da seção do usuário, sendo utilizado somente para os devs (essa dependência não será baixada pelo usuário)

O Nodemon tem a função de reinicializar nosso servidor a cada alteração. 

**Atualizando o start no Json 2**

Com o <nodemon> instalado, vamos atualizar o start no <json>

 "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }

**Criação da pasta controllers**

Essa pasta irá armazenar os arquivos que serão responsáveis por organizar as funcionalidades de nossa aplicação.

No momento, vamos criar o <atendimentos.js>. Ele será responsável por controlar tudo relacionado a essa rota.

**Instalando o CONSIGN**
<npm install consign>

O <consign> serve para agrupar todas as rotas e inseri-las no app. Para realizar essa tarefa, precisamos instalar e executar o <consign> em nossa aplicação:

_executar o consign_

consign()
  .include('controllers') *Captura todos os arquivos inseridos na pasta controllers*
  .into(app) *Insere no app*


**Criando a pasta controllers**

Essa pasta será responsável por armazenar todos os arquivos de configuração da nossa aplicação.

Para as configurações do Express, vamos criar o arquivo <customExpress.js>. Nele vamos transferir todas as configurações referentes aos <express> do arquivo index.js e inseri-los a uma função:

const express = require('express') 
const consign = require('consign') 

module.exports = () => {
const app = express() 

consign()
  .include('controllers')
  .into(app)

  return app
}
Feito isso, precisamos importar o customExpress para o index.js

<no index.js>

const customExpress = require('./config/customExpress')

const app = customExpress()

**Criando a rota post**

O método POST serve para enviar dados para o servidor. 

No arquivo <atendimentos.js>, vamos criar esse novo método:

<app.post('/atendimentos', (req,res) => res.send('Você está na rota de atendimentos e está realizando um post'))>

Aqui apenas foi criado o método post. O teste foi realizado pelo programa **POSTMAN**

**DESTRINXANDO O POST**

Para entender o método post, precisamo saber o que nosso cliente está enviando.

 app.post('/atendimentos', (req,res) => {
    console.log(req.body)
    res.send('Você está na rota de atendimentos e está realizando um post')
  })

*CONTENT TIPE*
  Quando preenchemos um formulário e o enviamos, o formato a ser é o <form-urlencoded>. Estamos enviando uma requisição. 

  Após ser inserido um valor no campo <body> da requisição, ao enviarmos os dados nos é retornado um <undefined>. Isso acontece porque nossa requisição não sabe 'ler' essas informações.

  Para resolver esse problema, vamos utilizar o próprio <express> para criar esse sistema de identificação:

  const express = require('express') 
const consign = require('consign') 

module.exports = () => {
  const app = express() 
  <app.use(express.json()) transforma esses dados num json
  app.use(express.urlencoded({ extended: true }))>
  consign()
    .include('controllers')
    .into(app)

    return app
}

## Talvez a recepção Json esteja prejudicada, analisar mais tarde

**Instalando o MySQL**

<npm install mysql>

Também é necessário instalar no computador (baixar instalador)

Feito isso, criar a pasta *infraestrutura* na pasta geral do projeto. Em nosso caso, tudo que estiver relacionado ao banco de dados será endereçado para essa pasta.

Agora vamos criar o arquivo <conexao.js>. Nesse arquivo, vamos importar o mysql (<const mysql = require('mysql)>) e depois criamos a const <conexao>. 

<const conexao = mysql.createConnection({})> //Esse comando espera um objeto com as configurações de nossa conexão.

<const conexao = mysql.createConnection({
host: 'localhost',
  port: '3306',
  user: 'root',
  password:'d26m0402',
  database:'agendamento_bravo'
})>

<module.exports = conexao>

Essas são as configurações iniciais necessárias para criar uma conexão com o banco de dados

Também é necessária a exportação desse modulo! 

Agora vamos importar esse módulo para o <index.js>!

<index.js>

No <index.js>, vamos importar o módulo (<const conexao = require('./infraestrutura/conexao.js')>). Feito isso, vamos criar a conexão:

<conexao.connect()> Dentro do connect precisamos criar uma função para verificar se a conexão foi realizada com sucesso.

Como primeiro parâmetro dessa função, vamos colocar um <erro> para que, caso a conexão não aconteça corretamente, o processo seja interrompido.

<conexao.connect((erro) => {
  if(erro) {
    console.log(erro)
  } else {
    console.log('Conectado com sucesso')
    const app = customExpress()
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
  }
})>

## CRIANDO ESTRUTURA DE TABELAS

Dentro da pasta <infraestrutura>, vamos criar um novo arquivo chamado <tabelas.js>.

1- Nesse arquivo, vamos inicia-lo com uma classe Tabelas e um init:
2- No <init>, vamos colocar como parâmetro <conexao> criado anteriormente para habilitar a conexão com o <MySql>.

  class Tabelas {
    init (conexao) {

    }
  }

  Para testes, inserimos um <console.log> para conferir o funcionamento dessa classe

  class Tabelas {
  init(conexao) {
      console.log('Tabelas foram chamasdas')
  }
}

module.exports = new Tabelas

Feito isso, vamos *importar* essa classe para o <index.js> e chamar o Tabela.init(conexao).

**Dentro do index.js**

...else {
    console.log('Conectado com sucesso')
    
    <Tabelas.init(conexao)>
    
    const app = customExpress()
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
  }...

**Dentro do tabelas.js**

Agora é necessário criar um novo método chamado <criarAtendimentos>. Também é necessário passar a <conexao> para nosso escôpo atual (utilizando o this.conexao = conexao)

class Tabelas {
  init(conexao) {
      this.conexao = conexao
  }
  criarAtendimentos() {
    
    this.conexao.query()
  }
}

Agora vamos chamar uma <query>. Essa query espera uma <query SQL> e uma função para ser executada depois que ela for executada.

## CRIANDO A QUERY SQL

Para criar uma <querySQL>, ela deve ser utilizada como uma const e conter os dados que serão necessários:

<const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT,cliente varchar(50) NOT NULL, instrumento varchar(30), servico varchar(30) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY (id))'>

*CREATE TABLE Atendimentos*
Cria a tabela Atendimentos
*id int NOT NULL AUTO_INCREMENT*
Campo id, não pode ser nulo e se auto-incrementa conforme são adicionados novos cadastros
*cliente varchar(50) NOT NULL*
Campo com o nome do cliente, com no máximo 50 caracteres e não pode ser nulo
*instrumento varchar(30)*
Nome do instrumento, máximo 30 caracteres
*servico varchar(20) NOT NULL*
Serviço a ser aplicado, não pode ser nulo
*status varchar(20) NOT NULL*
Status do serviço, não pode ser nulo
*observacoes text*
Campo de observações. como limite maior de caracteres
*PRIMARY KEY (id)*
Campo que define qual é o elemento principal para identificação (nesse caso, id)

Com a tabela criada, vamos agora criar essa tabela:

<criarAtendimentos() {
    const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, instrumento varchar(30), servico varchar(30) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY (id))'>

    this.conexao.query(sql, erro =>{
      if (erro) {
        console.log(erro)
      } else {
        console.log ('Tabela atendimentos criada com sucesso')
      }
    })
  }

  ## CRIANDO A PASTA MODELS

Essa pasta será a responsável por conectar, enviar, fazer validações de regras de negócio. Ela também serve para descentralizar essas funções da pasta <controllers>. Essa pasta será responsável por decidir quem irá enviar o que para onde!

Na pasta <models>, vamos criar o arquivo <atendimentos.js>. Esse arquivo vai fazer toda a parte de conexão.

Primeiramente vamos criar o primeiro método dessa classe chamado <adiciona>. Ele será responsável por receber os dados de algum lugar através de requisição. Também vamos importar a classe conexão:

//CONEXÃO 
const conexao = require('../infraestrutura/conexao.js')

class Atendimento {
  adiciona() {
    
  }
}

Agora vamos criar uma nova <query> com os seguintes parâmetros:

*const sql = 'INSERT INTO Atendimentos SET ?'*
Vai inserir o que for necessário na tabela <Atendimentos>

class Atendimento {
  adiciona(atendimento) {
    const sql = 'INSERT INTO Atendimentos SET ?'

    conexao.query(sql, atendimento, (erro) => {
      if (erro) {
        console.log(erro)
      } else {
        console.log(resultados)
      }
    })
  }
}

*Em conexao.query(  sql,       atendimento,                      (erro,     resultados) => {*
                  padrão/   objeto a ser salvo/      função para erro ou o que foi alterado


## NO ATENDIMENTOS/CONTROLLERS

const Atendimento = require('../models/atendimentos.js')
module.exports = app => { 
  app.get('/atendimentos', (req, res) =>res.send('Você está na rota de Atendimentos e está realizando um  get')) //Recebe os dados

  app.post('/atendimentos', (req,res) => {
    const atendimento = req.body  *O corpo das informações é o body*
    Atendimento.adiciona(atendimento) *A classe Atendimento vai receber os dados inseridos na const <atendimento>*
    res.send('Você está na rota de atendimentos e está realizando um post')
  })
}

# ADICIONANDO DATAS NA TABELA

Na pasta <infraestrutura>, no arquivo <tabelas>, vamos adicionar a nossa estrutura da tabela o campo data.

Primeiro, vamos alterar a tabela e adicionar dois campos novos:
<const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, instrumento varchar(30), servico varchar(30) NOT NULL,data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY (id))'>


**NO MySQL**

<alter table agendamento_bravo.atendimentos add data datetime NOT NULL, ADD dataCriacao datetime NOT NULL;>

Agora precisamos alterar a criação de datas no <atendimentos.js> da pasta <models>. Para isso, vamos criar um novo objeto para evitar qualquer tipo de conflito nos demais campos:

class Atendimento {
  adiciona(atendimento) {
    const dataCriacao = new Date() __captura da data__ 
    const atendimentoDatado = {...atendimento, dataCriacao} <novo objeto que captura o conteúdo do array __atendimento__ mais o __dataCriacao__ para adicionar a data>

    const sql = 'INSERT INTO Atendimentos SET ?'

    conexao.query(sql, atendimentoDatado, (erro,resultados) => {
      if (erro) {
        console.log(erro)
      } else {
        console.log(resultados)
      }
    })
  }
}

Mesmo com os campos criados corretamente, o <MySQL> não aceitará a data de forma válida, então será preciso <converter> a data que foi criada manualmente (não a data gerada automaticamente pelo <MySQL>)

**MOMENT**
<npm install moment>
Biblioteca que manipula, faz cálculos e formata datas.

Depois de importado no <models/atendimentos>, vamos manipular essa data:

...
<const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')>
<const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')>
<const atendimentoDatado = {...atendimento, dataCriacao, data}>
...