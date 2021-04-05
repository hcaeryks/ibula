const mysql = require('mysql');
//para acessar o banco de dados utilize a variavel "database"
const database = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'LUtMU4ebQM',
  password: 'rTbWkXuxr6',
  database: 'LUtMU4ebQM'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});