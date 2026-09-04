const API = 'http://localhost:3000';

const usuarioSalvo =
    localStorage.getItem('usuario');

if (!usuarioSalvo) {

    window.location.href = 'index.html';

}

const usuario =
    JSON.parse(usuarioSalvo);


document.getElementById(
    'nomeUsuario'
).textContent = usuario.nome;

const listaProdutos =
    document.getElementById('listaProdutos');

const mensagem =
    document.getElementById('mensagem');

const modal =
    document.getElementById('modal');

const formProduto =
    document.getElementById('formProduto');

async function listarProdutos() {
    try {

        const resposta = await fetch(
            `${API}/produtos`
        );

        const produtos =
            await resposta.json();


        listaProdutos.innerHTML = '';


        if (produtos.length === 0) {

            listaProdutos.innerHTML = `
                <tr>
                    <td colspan="7">
                        Nenhum produto cadastrado.
                    </td>
                </tr>
            `;

            return;
        }


        produtos.forEach(produto => {

            const linha =
                document.createElement('tr');


            linha.innerHTML = `

                <td>${produto.id}</td>

                <td>
                    <strong>
                        ${produto.nome}
                    </strong>
                </td>

                <td>
                    ${produto.descricao || '-'}
                </td>

                <td>
                    R$ ${Number(produto.custo).toFixed(2)}
                </td>

                <td>
                    ${produto.quant_estoque}
                </td>

                <td>
                    ${produto.estoq_minimo}
                </td>

                <td>

                    <button
                        class="btn-editar"
                        onclick="editarProduto(${produto.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.id})"
                    >
                        Excluir
                    </button>

                </td>

            `;


            listaProdutos.appendChild(linha);

        });


    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            'Erro ao carregar os produtos.',
            true
        );
    }
}



async function buscarProdutos() {

    const nome =
        document.getElementById(
            'campoBusca'
        ).value;


    try {

        const resposta = await fetch(
            `${API}/produtos/buscar?nome=${encodeURIComponent(nome)}`
        );


        const produtos =
            await resposta.json();


        listaProdutos.innerHTML = '';


        if (produtos.length === 0) {

            listaProdutos.innerHTML = `
                <tr>
                    <td colspan="7">
                        Nenhum produto encontrado.
                    </td>
                </tr>
            `;

            return;
        }


        produtos.forEach(produto => {

            const linha =
                document.createElement('tr');


            linha.innerHTML = `

                <td>${produto.id}</td>

                <td>
                    <strong>
                        ${produto.nome}
                    </strong>
                </td>

                <td>
                    ${produto.descricao || '-'}
                </td>

                <td>
                    R$ ${Number(produto.custo).toFixed(2)}
                </td>

                <td>
                    ${produto.quant_estoque}
                </td>

                <td>
                    ${produto.estoq_minimo}
                </td>

                <td>

                    <button
                        class="btn-editar"
                        onclick="editarProduto(${produto.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.id})"
                    >
                        Excluir
                    </button>

                </td>

            `;


            listaProdutos.appendChild(linha);

        });


    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            'Erro ao buscar produtos.',
            true
        );
    }
}

document.getElementById(
    'btnNovoProduto'
).addEventListener(
    'click',
    function () {

        formProduto.reset();

        document.getElementById(
            'produtoId'
        ).value = '';

        document.getElementById(
            'tituloModal'
        ).textContent = 'Novo produto';

        modal.classList.add('ativo');

    }
);

async function editarProduto(id) {

    try {

        const resposta = await fetch(
            `${API}/produtos`
        );


        const produtos =
            await resposta.json();


        const produto =
            produtos.find(
                item => item.id === id
            );


        if (!produto) {

            mostrarMensagem(
                'Produto não encontrado.',
                true
            );

            return;
        }


        document.getElementById(
            'produtoId'
        ).value = produto.id;


        document.getElementById(
            'nome'
        ).value = produto.nome;


        document.getElementById(
            'descricao'
        ).value = produto.descricao || '';


        document.getElementById(
            'custo'
        ).value = produto.custo;


        document.getElementById(
            'quant_estoque'
        ).value = produto.quant_estoque;


        document.getElementById(
            'estoq_minimo'
        ).value = produto.estoq_minimo;


        document.getElementById(
            'tituloModal'
        ).textContent = 'Editar produto';


        modal.classList.add('ativo');


    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            'Erro ao carregar produto.',
            true
        );
    }
}

formProduto.addEventListener(
    'submit',
    async function (evento) {

        evento.preventDefault();

        const id =
            document.getElementById(
                'produtoId'
            ).value;

        const nome =
            document.getElementById(
                'nome'
            ).value.trim();

        const descricao =
            document.getElementById(
                'descricao'
            ).value.trim();

        const custo =
            Number(
                document.getElementById(
                    'custo'
                ).value
            );

        const quant_estoque =
            Number(
                document.getElementById(
                    'quant_estoque'
                ).value
            );

        const estoq_minimo =
            Number(
                document.getElementById(
                    'estoq_minimo'
                ).value
            );
        if (!nome) {
            alert(
                'Informe o nome do produto.'
            );
            return;
        }

        if (custo < 0) {
            alert(
                'O custo não pode ser negativo.'
            );
            return;
        }
        if (quant_estoque < 0) {
            alert(
                'O estoque não pode ser negativo.'
            );
            return;
        }

        if (estoq_minimo < 0) {
            alert(
                'O estoque mínimo não pode ser negativo.'
            );
            return;
        }

        const produto = {
            nome,
            descricao,
            custo,
            quant_estoque,
            estoq_minimo

        };

        try {
            let resposta;

            if (id) {
                resposta = await fetch(
                    `${API}/produtos/${id}`,
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(produto)
                    }
                );

            }
            else {

                resposta = await fetch(
                    `${API}/produtos`,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(produto)
                    }
                );

            }


            const dados =
                await resposta.json();


            if (!resposta.ok) {

                alert(
                    dados.mensagem ||
                    'Erro ao salvar produto.'
                );

                return;
            }


            alert(
                dados.mensagem
            );


            fecharModal();

            listarProdutos();


        } catch (erro) {

            console.error(erro);

            alert(
                'Erro ao conectar com o servidor.'
            );
        }

    }
);

async function excluirProduto(id) {
    const confirmar =
        confirm(
            'Tem certeza que deseja excluir este produto?'
        );


    if (!confirmar) {
        return;
    }


    try {

        const resposta = await fetch(
            `${API}/produtos/${id}`,
            {
                method: 'DELETE'
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem
            );

            return;
        }


        alert(
            dados.mensagem
        );


        listarProdutos();


    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao excluir produto.'
        );
    }
}

function fecharModal() {
    modal.classList.remove('ativo');
    formProduto.reset();

}

document.getElementById(
    'btnFecharModal'
).addEventListener(
    'click',
    fecharModal
);


document.getElementById(
    'btnCancelar'
).addEventListener(
    'click',
    fecharModal
);

document.getElementById(
    'btnBuscar'
).addEventListener(
    'click',
    buscarProdutos
);


document.getElementById(
    'btnListar'
).addEventListener(
    'click',
    function () {

        document.getElementById(
            'campoBusca'
        ).value = '';

        listarProdutos();

    }
);

document.getElementById(
    'campoBusca'
).addEventListener(
    'keydown',
    function (evento) {

        if (evento.key === 'Enter') {

            buscarProdutos();

        }

    }
);

document.getElementById(
    'btnVoltar'
).addEventListener(
    'click',
    function () {

        window.location.href =
            'principal.html';

    }
);

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

function mostrarMensagem(
    texto,
    erro = false
) {

    mensagem.textContent = texto;

}
listarProdutos();