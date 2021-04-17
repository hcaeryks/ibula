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

//Code de Donwload

database.query("SELECT linkbula FROM remedio WHERE id = 'id_remedio'", (err, rows) => {
    if(err) throw err;
    link = rows[0].linkbula
    console.log(link)
    })

//Code do botão
/*
<form method="get" action="Coloque o link"></form>
    <button type="submit">Download!</button>
*/