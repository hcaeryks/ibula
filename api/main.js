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
        console.log(categorias_filtro)
    })
}

//Recebe o nome da categoria e remove o id da categoria na lista
function RemoverCategoriaFiltro(categoria) {
  database.query("SELECT id FROM `categoria` WHERE nome = '" + categoria + "'", (err, rows) => {
      if(err) throw err;
      categorias_filtro.splice(categorias_filtro.indexOf(rows[0].id), 1)
      console.log(categorias_filtro)
  })
}

function RetornaListaNomes(lista) {
    x = []
    for(i = 0; i < lista.length; i++) {
        x.push(lista[i].nome)
    }
    return x
}
//Retorna uma lista com o nome dos remedios de uma determinada categoria
function BuscaRemedioCategoria() {
    busca_categoria = ""
    for(i = 0; i < categorias_filtro.length; i++) {
      if(i == 0) {
        busca_categoria += "WHERE categoria = "
      }
      if(i == categorias_filtro.length-1) {
          busca_categoria += "'"+ String(categorias_filtro[i]) + "'"
      }
      else {
          busca_categoria += String(categorias_filtro[i]) + "AND categoria = "
      }
    }
    database.query("SELECT nome FROM `remedio` " + busca_categoria, async (error, rows) => {
        if(error) throw error;
        var retorno = RetornaListaNomes(rows)
        console.log(retorno)
        return retorno
    })
};

function BuscaRemedioNome(nome="*") {
    var lista = BuscaRemedioCategoria()
    console.log(lista)
    console.log("Busca nome")
}

var categorias_filtro = []

//BuscaRemedioNome()

function allNames() {
  database.query("SELECT nome FROM remedio", (err, rows) => {
    if(err) throw err;
    console.log(JSON.stringify(rows, null, 5))
  })
}

allNames()