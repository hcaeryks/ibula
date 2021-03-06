/*
Caso apareça algum erro relacionado ao throw err basta apagar a pasta node_modules e o arquivo package-lock.json e instalar novamente pelos comandos abaixo
*/

//npm install --save-dev nodemon
//npm install mysql
const mysql = require('mysql');
const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 8080;
app.use(cors());
//para acessar o banco de dados utilize a variavel "database"
let database = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'LUtMU4ebQM',
    password: 'rTbWkXuxr6',
    database: 'LUtMU4ebQM'
});
database.connect((err) => {
    if(err) throw err;
    console.log("Conectado no Banco de Dados")
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

function handleDisconnect() {
    database.on('error', function(err){
      if(!err.fatal) {
        return;
      }
  
      if(err.code !== 'PROTOCOL_CONNECTION_LOST'){
        throw err;
      }
  
      console.log('\nRe-connecting lost connection: ' +err.stack);
      database = mysql.createConnection(database.config);
  
      handleDisconnect(database);
      database.connect();
    });
  }

  handleDisconnect(database);

//Adicionar uma categoria ao filtro (recebe o nome da categoria e coloca o id da categoria na lista)
function AdicionarCategoriaFiltro(categoria) {
    database.query("SELECT id FROM `categoria` WHERE nome = '" + categoria + "'", (err, rows) => {
        if(err) throw err;
        categorias_filtro.push(rows[0].id)
        return "OK";
    })
}

//Recebe o nome da categoria e remove o id da categoria na lista
function RemoverCategoriaFiltro(categoria) {
  database.query("SELECT id FROM `categoria` WHERE nome = '" + categoria + "'", (err, rows) => {
      if(err) throw err;
      categorias_filtro.splice(categorias_filtro.indexOf(rows[0].id), 1)
		return "OK";
  })
}

function RetornaListaNomes(lista) {
    resultados_busca.splice(0, resultados_busca.length)
    for(let i = 0; i < lista.length; i++) {
        resultados_busca.push(lista[i].nome)
    }
}

var categorias_filtro = []
var resultados_busca = []

//Faz a busca dos remedios que contem as categorias do filtro e contem o filtro de busca por nome
function ProcurarRemedio(busca = "") {
    busca_completa = ""
    for(let i = 0; i < categorias_filtro.length; i++) {
        if(i == 0) {
            busca_completa += " WHERE (categoria = "
        }
        if(i == categorias_filtro.length-1) {
            busca_completa += "'"+ String(categorias_filtro[i]) + "')"
        }
        else {
            busca_completa += "'" + String(categorias_filtro[i]) + "'" + " OR categoria = "
        }
    }
    if(busca != "") {
        busca_completa += ""
    }

    if(busca_completa != "" && busca != "") {
        busca_completa += " AND nome LIKE " + "'%" + busca + "%'"
    }
    else {
        if(busca_completa == "" && busca != "") {
            busca_completa += " WHERE nome LIKE '%" + busca + "%'"
        }
    }
    database.query("SELECT nome FROM remedio" + busca_completa, (err, rows) => {
        if(err) throw err;
        RetornaListaNomes(rows);
    })
}

app.get('/api/download', async function (req, res) {
    let id_remedio = req.query.id;
    database.query("SELECT linkbula FROM remedio WHERE id = '" + id_remedio + "'", (err, rows) => {
        if(err) throw err;
        res.header("Content-Type", "application/json");
        res.send(JSON.stringify(rows[0], null, 5));
    })    
})

app.get('/api/todos', function (req, res) {
    ProcurarRemedio()
    console.log(categorias_filtro)
    setTimeout(() => {
		res.header("Content-Type", "application/json");
		res.send(JSON.stringify(resultados_busca, null, 5));
    }, 400)
})

app.get('/api/adicionar_categoria', function (req, res) {
    let categoria = req.query.categoria;
    res.send(AdicionarCategoriaFiltro(categoria))
})

app.get('/api/remover_categoria', function (req, res) {
    let categoria = req.query.categoria;
    res.send(RemoverCategoriaFiltro(categoria))
    console.log(categorias_filtro)
})

app.get('/api/filtro', async function (req, res) {
    let procura = req.query.filtro;
    console.log(procura);
    ProcurarRemedio(procura);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(resultados_busca, null, 5));
})

app.listen(port, () => {
    console.log('Running on '+port+'.');
  });