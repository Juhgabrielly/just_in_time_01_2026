const API='http://localhost:3000';

const usuarioSalvo=localStorage.getItem('usuario');

if(!usuarioSalvo){
    window.location.href='index.html';
}

const usuario=JSON.parse(usuarioSalvo);

document.getElementById('nomeUsuario').textContent=usuario.nome;

const selectProduto=document.getElementById('produto');
const selectTipo=document.getElementById('tipo');
const estoqueAtual=document.getElementById('estoqueAtual');
const listaEstoque=document.getElementById('listaEstoque');
const alertaEstoque=document.getElementById('alertaEstoque');
const form=document.getElementById('formMovimentacao');

let produtos=[];

async function carregarProdutos(){
    try{
        const resposta=await fetch(`${API}/produtos`);
        produtos=await resposta.json();

        produtos.sort((a,b)=>a.nome.localeCompare(b.nome));

        selectProduto.innerHTML=`
            <option value="">Selecione um produto</option>
        `;

        produtos.forEach(produto=>{
            const option=document.createElement('option');
            option.value=produto.id;
            option.textContent=produto.nome;
            selectProduto.appendChild(option);
        });

        mostrarEstoque();
    }catch(erro){
        console.error(erro);
        alert('Erro ao carregar os produtos.');
    }
}

selectProduto.addEventListener('change',function(){
    const id=Number(this.value);
    const produto=produtos.find(item=>item.id===id);

    if(!produto){
        estoqueAtual.textContent='-';
        return;
    }

    estoqueAtual.textContent=produto.quant_estoque;
    verificarEstoqueMinimo(produto);
});

function verificarEstoqueMinimo(produto){
    if(Number(produto.quant_estoque)<=Number(produto.estoq_minimo)){
        alertaEstoque.textContent=`ATENÇÃO: o produto "${produto.nome}" está no estoque mínimo ou abaixo dele.`;
        alertaEstoque.classList.add('exibir');
    }else{
        alertaEstoque.textContent='';
        alertaEstoque.classList.remove('exibir');
    }
}

function mostrarEstoque(){
    listaEstoque.innerHTML='';

    produtos.forEach(produto=>{
        const linha=document.createElement('tr');
        const estoque=Number(produto.quant_estoque);
        const minimo=Number(produto.estoq_minimo);

        let status;

        if(estoque<=minimo){
            status=`
                <span class="status status-alerta">
                    Estoque baixo
                </span>
            `;
        }else{
            status=`
                <span class="status status-ok">
                    Estoque normal
                </span>
            `;
        }

        linha.innerHTML=`
            <td><strong>${produto.nome}</strong></td>
            <td>${estoque}</td>
            <td>${minimo}</td>
            <td>${status}</td>
        `;

        listaEstoque.appendChild(linha);
    });
}

form.addEventListener('submit',async function(evento){
    evento.preventDefault();

    const idProduto=Number(selectProduto.value);
    const tipo=selectTipo.value;
    const quantidade=Number(document.getElementById('quantidade').value);
    const data=document.getElementById('data').value;

    if(!idProduto){
        alert('Selecione um produto.');
        return;
    }

    if(!tipo){
        alert('Selecione o tipo de movimentação.');
        return;
    }

    if(!quantidade||quantidade<=0){
        alert('Informe uma quantidade válida.');
        return;
    }

    if(!data){
        alert('Informe a data.');
        return;
    }

    const produto=produtos.find(item=>item.id===idProduto);

    if(tipo==='PEDIDO'&&quantidade>Number(produto.quant_estoque)){
        alert('Estoque insuficiente para realizar o pedido.');
        return;
    }

    const movimentacao={
        id_produto:idProduto,
        id_usuario:usuario.id,
        quantidade:quantidade,
        tipo:tipo,
        data:data
    };

    try{
        const resposta=await fetch(`${API}/movimentacoes`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(movimentacao)
        });

        const dados=await resposta.json();

        if(!resposta.ok){
            alert(dados.mensagem||'Erro ao registrar movimentação.');
            return;
        }

        alert(dados.mensagem);

        form.reset();
        estoqueAtual.textContent='-';
        alertaEstoque.classList.remove('exibir');

        await carregarProdutos();
    }catch(erro){
        console.error(erro);
        alert('Erro ao conectar com o servidor.');
    }
});

document.getElementById('btnAtualizar').addEventListener('click',carregarProdutos);

document.getElementById('btnVoltar').addEventListener('click',function(){
    window.location.href='principal.html';
});

document.getElementById('btnSair').addEventListener('click',function(){
    localStorage.removeItem('usuario');
    window.location.href='index.html';
});

const campoData=document.getElementById('data');
const hoje=new Date();
const ano=hoje.getFullYear();
const mes=String(hoje.getMonth()+1).padStart(2,'0');
const dia=String(hoje.getDate()).padStart(2,'0');

campoData.value=`${ano}-${mes}-${dia}`;

carregarProdutos();