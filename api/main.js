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
  if (err) throw err;
});

//Retorna uma lista com os remedios de determinada categoria
function busca_categoria(categoria) {
  database.query("SELECT * FROM `categoria` WHERE nome = '" + categoria + "'", (err,rows) => {
  if(err) throw err;
  console.log('Data received from Db:');
  console.log(rows);
  id_categoria = rows.id
  return database.query("SELECT * FROM `remedio` WHERE categoria = '" + id_categoria + "'")
});
}