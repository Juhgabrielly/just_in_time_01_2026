const formLogin = document.getElementById('formLogin');

const mensagem = document.getElementById('mensagem');


formLogin.addEventListener('submit', async function (evento) {

    evento.preventDefault();

    const email =
        document.getElementById('email').value;

    const senha =
        document.getElementById('senha').value;


    try {

        const resposta = await fetch(
            'http://localhost:3000/usuarios/login',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            }
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            mensagem.textContent =
                dados.mensagem;

            return;
        }


        // Guarda o usuário logado
        localStorage.setItem(
            'usuario',
            JSON.stringify(dados.usuario)
        );


        mensagem.textContent =
            'Login realizado com sucesso!';


        // Vai para a tela principal
        setTimeout(function () {

            window.location.href =
                'principal.html';

        }, 500);


    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            'Não foi possível conectar ao servidor.';
    }

});