//npm install --save-dev nodemon
//npm intall mysql
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

function retorna_lista_nomes(lista) {
  x = []
  for(i = 0; i < lista.length; i++) {
    x.push(lista[i].nome)
  }
  return x
}

//Retorna uma lista com o nome dos remedios de uma determinada categoria
function busca_categoria(categoria) {
  database.query("SELECT id FROM `categoria` WHERE nome = '" + categoria + "'", (err,rows) => {
  if(err) throw err;
  database.query("SELECT nome FROM `remedio` WHERE categoria = '" + String(rows[0].id) + "'", (error, rows) => {
    if(error) throw error;
    var retorno = retorna_lista_nomes(rows)
    return retorno
  })
});
}

var teste = busca_categoria("Controlados")
console.log(teste)