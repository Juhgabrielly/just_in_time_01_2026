const db = require('../data/database');

function login(req, res) {
    const { email, senha } = req.body;

    // Validação
    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Email e senha são obrigatórios.'
        });
    }

    const sql = `
        SELECT id, nome, email
        FROM usuario
        WHERE email = ? AND senha = ?
    `;

    db.query(sql, [email, senha], (erro, resultado) => {
        if (erro) {
            console.error('Erro no login:', erro);

            return res.status(500).json({
                mensagem: 'Erro interno do servidor.'
            });
        }

        // Usuário não encontrado
        if (resultado.length === 0) {
            return res.status(401).json({
                mensagem: 'Email ou senha incorretos.'
            });
        }

        const usuario = resultado[0];

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: usuario
        });
    });
}

module.exports = {
    login
};