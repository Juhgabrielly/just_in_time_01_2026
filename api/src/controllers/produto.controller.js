const db = require('../data/database');


// LISTAR PRODUTOS
function listarProdutos(req, res) {

    const sql = `
        SELECT *
        FROM produto
        ORDER BY nome ASC
    `;

    db.query(sql, (erro, resultados) => {

        if (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar produtos.'
            });
        }

        res.status(200).json(resultados);
    });
}


// BUSCAR PRODUTOS
function buscarProdutos(req, res) {

    const { nome } = req.query;

    const sql = `
        SELECT *
        FROM produto
        WHERE nome LIKE ?
        ORDER BY nome ASC
    `;

    db.query(sql, [`%${nome || ''}%`], (erro, resultados) => {

        if (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar produtos.'
            });
        }

        res.status(200).json(resultados);
    });
}


// CADASTRAR PRODUTO
function cadastrarProduto(req, res) {

    const {
        nome,
        descricao,
        custo,
        quant_estoque,
        estoq_minimo
    } = req.body;


    if (
        !nome ||
        custo === undefined ||
        quant_estoque === undefined ||
        estoq_minimo === undefined
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos obrigatórios.'
        });
    }


    if (
        Number(custo) < 0 ||
        Number(quant_estoque) < 0 ||
        Number(estoq_minimo) < 0
    ) {
        return res.status(400).json({
            mensagem: 'Os valores não podem ser negativos.'
        });
    }


    const sql = `
        INSERT INTO produto
        (nome, descricao, custo, quant_estoque, estoq_minimo)
        VALUES (?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            nome,
            descricao || null,
            custo,
            quant_estoque,
            estoq_minimo
        ],
        (erro, resultado) => {

            if (erro) {
                console.error(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar produto.'
                });
            }


            res.status(201).json({
                mensagem: 'Produto cadastrado com sucesso!',
                id: resultado.insertId
            });
        }
    );
}


// EDITAR PRODUTO
function editarProduto(req, res) {

    const { id } = req.params;

    const {
        nome,
        descricao,
        custo,
        quant_estoque,
        estoq_minimo
    } = req.body;


    if (
        !nome ||
        custo === undefined ||
        quant_estoque === undefined ||
        estoq_minimo === undefined
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos obrigatórios.'
        });
    }


    if (
        Number(custo) < 0 ||
        Number(quant_estoque) < 0 ||
        Number(estoq_minimo) < 0
    ) {
        return res.status(400).json({
            mensagem: 'Os valores não podem ser negativos.'
        });
    }


    const sql = `
        UPDATE produto
        SET
            nome = ?,
            descricao = ?,
            custo = ?,
            quant_estoque = ?,
            estoq_minimo = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [
            nome,
            descricao || null,
            custo,
            quant_estoque,
            estoq_minimo,
            id
        ],
        (erro, resultado) => {

            if (erro) {
                console.error(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao editar produto.'
                });
            }


            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.'
                });
            }


            res.status(200).json({
                mensagem: 'Produto atualizado com sucesso!'
            });
        }
    );
}


// EXCLUIR PRODUTO
function excluirProduto(req, res) {

    const { id } = req.params;


    const sql = `
        DELETE FROM produto
        WHERE id = ?
    `;


    db.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Não foi possível excluir o produto. Verifique se ele possui movimentações.'
            });
        }


        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }


        res.status(200).json({
            mensagem: 'Produto excluído com sucesso!'
        });
    });
}


module.exports = {
    listarProdutos,
    buscarProdutos,
    cadastrarProduto,
    editarProduto,
    excluirProduto
};