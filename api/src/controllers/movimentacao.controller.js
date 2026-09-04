const db = require('../data/database');

function listarMovimentacoes(req, res) {

    const sql = `
        SELECT 
            movimentacao.*,
            produto.nome AS nome_produto,
            usuario.nome AS nome_usuario
        FROM movimentacao
        INNER JOIN produto 
            ON movimentacao.id_produto = produto.id
        INNER JOIN usuario 
            ON movimentacao.id_usuario = usuario.id
        ORDER BY movimentacao.data DESC
    `;

    db.query(sql, (erro, resultados) => {

        if (erro) {
            console.error('Erro ao listar movimentações:', erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar movimentações.'
            });
        }

        res.status(200).json(resultados);
    });
}

function registrarMovimentacao(req, res) {

    const {
        id_produto,
        id_usuario,
        quantidade,
        tipo,
        data
    } = req.body;
    if (
        !id_produto ||
        !id_usuario ||
        !quantidade ||
        !tipo ||
        !data
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos obrigatórios.'
        });
    }

    if (Number(quantidade) <= 0) {
        return res.status(400).json({
            mensagem: 'A quantidade deve ser maior que zero.'
        });
    }

    
    if (tipo !== 'FABRICADO' && tipo !== 'PEDIDO') {
        return res.status(400).json({
            mensagem: 'Tipo de movimentação inválido.'
        });
    }

    const sqlProduto = `
        SELECT *
        FROM produto
        WHERE id = ?
    `;

    db.query(sqlProduto, [id_produto], (erro, produtos) => {

        if (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar produto.'
            });
        }

        if (produtos.length === 0) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        const produto = produtos[0];

        let novoEstoque;

        if (tipo === 'FABRICADO') {

            novoEstoque =
                Number(produto.quant_estoque) +
                Number(quantidade);

        }

        else {

            if (Number(quantidade) > Number(produto.quant_estoque)) {

                return res.status(400).json({
                    mensagem: 'Estoque insuficiente para realizar o pedido.'
                });
            }

            novoEstoque =
                Number(produto.quant_estoque) -
                Number(quantidade);
        }

        const sqlEstoque = `
            UPDATE produto
            SET quant_estoque = ?
            WHERE id = ?
        `;

        db.query(
            sqlEstoque,
            [novoEstoque, id_produto],
            (erro) => {

                if (erro) {
                    console.error(erro);

                    return res.status(500).json({
                        mensagem: 'Erro ao atualizar estoque.'
                    });
                }

                const sqlMovimentacao = `
                    INSERT INTO movimentacao
                    (id_produto, id_usuario, quantidade, tipo, data)
                    VALUES (?, ?, ?, ?, ?)
                `;

                db.query(
                    sqlMovimentacao,
                    [
                        id_produto,
                        id_usuario,
                        quantidade,
                        tipo,
                        data
                    ],
                    (erro) => {

                        if (erro) {
                            console.error(erro);

                            return res.status(500).json({
                                mensagem: 'Erro ao registrar movimentação.'
                            });
                        }

                        
                        let mensagem =
                            'Movimentação registrada com sucesso!';

                        if (
                            Number(novoEstoque) <=
                            Number(produto.estoq_minimo)
                        ) {
                            mensagem +=
                                ' ATENÇÃO: estoque abaixo ou igual ao mínimo!';
                        }

                        res.status(201).json({
                            mensagem: mensagem,
                            estoque_atual: novoEstoque
                        });
                    }
                );
            }
        );
    });
}


module.exports = {
    listarMovimentacoes,
    registrarMovimentacao
};