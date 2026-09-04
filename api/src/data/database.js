const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'preparacao_db'
});

db.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco:', erro);
        return;
    }

    console.log('Banco de dados conectado!');
});

module.exports = db;