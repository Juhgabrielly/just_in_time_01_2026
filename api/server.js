const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./src/routes/usuarios.routes');

const produtoRoutes = require('./src/routes/produto.routes');

const movimentacaoRoutes = require('./src/routes/movimentacao.routes');


const app = express();

app.use(cors());

app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/produtos', produtoRoutes);
app.use('/movimentacoes', movimentacaoRoutes);

app.get('/', (req, res) => {

    res.json({
        mensagem: 'API do sistema MDF funcionando!'
    });

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

});