const API='http://localhost:3000';

const usuarioSalvo=localStorage.getItem('usuario');

if(!usuarioSalvo){
    window.location.href='index.html';
}

const usuario=JSON.parse(usuarioSalvo);

document.getElementById('nomeUsuario').textContent=usuario.nome;

const listaMovimentacoes=document.getElementById('listaMovimentacoes');
const mensagem=document.getElementById('mensagem');

async function carregarMovimentacoes(){
    try{
        mensagem.textContent='Carregando...';

        const resposta=await fetch(`${API}/movimentacoes`);
        const movimentacoes=await resposta.json();

        listaMovimentacoes.innerHTML='';

        if(movimentacoes.length===0){
            mensagem.textContent='Nenhuma movimentação encontrada.';
            return;
        }

        mensagem.textContent='';

        movimentacoes.forEach(movimentacao=>{
            const linha=document.createElement('tr');

            const data=movimentacao.data
                ? new Date(movimentacao.data).toLocaleDateString('pt-BR')
                : '-';

            const classeTipo=movimentacao.tipo==='FABRICADO'
                ? 'tipo-fabricado'
                : 'tipo-pedido';

            linha.innerHTML=`
                <td>${movimentacao.nome_produto}</td>
                <td>${movimentacao.nome_usuario}</td>
                <td class="${classeTipo}">${movimentacao.tipo}</td>
                <td>${movimentacao.quantidade}</td>
                <td>${data}</td>
            `;

            listaMovimentacoes.appendChild(linha);
        });
    }catch(erro){
        console.error(erro);
        mensagem.textContent='Erro ao carregar as movimentações.';
    }
}

document.getElementById('btnAtualizar').addEventListener('click',carregarMovimentacoes);

document.getElementById('btnVoltar').addEventListener('click',function(){
    window.location.href='principal.html';
});

document.getElementById('btnSair').addEventListener('click',function(){
    localStorage.removeItem('usuario');
    window.location.href='index.html';
});

carregarMovimentacoes();