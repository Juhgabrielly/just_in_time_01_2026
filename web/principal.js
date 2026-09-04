const usuarioSalvo =
    localStorage.getItem('usuario');

if (!usuarioSalvo) {

    window.location.href =
        'index.html';

}
const usuario =
    JSON.parse(usuarioSalvo);

document.getElementById(
    'nomeUsuario'
).textContent = usuario.nome;

document.getElementById(
    'btnSair'
).addEventListener(
    'click',
    function () {

        localStorage.removeItem(
            'usuario'
        );

        window.location.href =
            'index.html';

    }
);

function abrirProdutos() {

    window.location.href =
        'produtos.html';

}

function abrirProducao() {

    window.location.href =
        'producao.html';

}

function abrirMovimentacoes() {

    window.location.href =
        'movimentacoes.html';

}