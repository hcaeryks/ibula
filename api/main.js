/*
Caso apareça algum erro relacionado ao throw err basta apagar a pasta node_modules e o arquivo package-lock.json e instalar novamente pelos comandos abaixo
*/

//npm install --save-dev nodemon
//npm install mysql
const mysql = require('mysql');
//para acessar o banco de dados utilize a variavel "database"
const database = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'LUtMU4ebQM',
    password: 'rTbWkXuxr6',
    database: 'LUtMU4ebQM'
});
database.connect((err) => {
    if(err) throw err;
    console.log("Conectado no Banco de Dados")
});

//Adicionar uma categoria ao filtro (recebe o nome da categoria e coloca o id da categoria na lista)
function AdicionarCategoriaFiltro(categoria) {
    database.query("SELECT id FROM `categoria` WHERE nome = '" + categoria + "'", (err, rows) => {
        if(err) throw err;
        categorias_filtro.push(rows[0].id)
    })
}

//Recebe o nome da categoria e remove o id da categoria na lista
function RemoverCategoriaFiltro(categoria) {
  database.query("SELECT id FROM `categoria` WHERE nome = '" + categoria + "'", (err, rows) => {
      if(err) throw err;
      categorias_filtro.splice(categorias_filtro.indexOf(rows[0].id), 1)
  })
}

function RetornaListaNomes(lista) {
    resultados_busca.splice(0, resultados_busca.length)
    for(let i = 0; i < lista.length; i++) {
        resultados_busca.push(lista[i].nome)
    }
    return
}

var categorias_filtro = []
var resultados_busca = []

//Faz a busca dos remedios que contem as categorias do filtro e contem o filtro de busca por nome
function ProcurarRemedio(busca="") {
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
    console.log(busca_completa)
    database.query("SELECT nome FROM remedio" + busca_completa, (err, rows) => {
        if(err) throw err;
        RetornaListaNomes(rows)
        console.log(resultados_busca)
    })
}

