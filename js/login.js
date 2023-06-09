const login = document.querySelector('.login');
const botao = document.querySelector('.botao_jogar');
const nome = document.querySelector('.nome_login');
const voltar = document.querySelector('.voltar')

function validarNome ({ target }) {
    if (target.value.length > 3) {
        botao.removeAttribute('disabled');
        return;
    }
    botao.setAttribute('disabled', '');
};

function guardarNome(event){
    event.preventDefault();
    localStorage.setItem('jogador', nome.value);
    window.location = 'pages/game.html'
};

voltar.onclick = function b_voltar(){
    window.location = 'pages/ranking.html'
};

login.addEventListener('input', validarNome);
login.addEventListener('submit', guardarNome);