const tabueiro = document.querySelector('.tabuleiro');
const Spanjogador = document.querySelector('.jogador');
const tempo = document.querySelector('.tempo');
const personagens = [
    'Amumu',
    'Caitlyn',
    'Heimerdinger',
    'Illaoi',
    'Kindred',
    'Nunu',
    'Qiyana',
    'Thresh',
    'Tristana',
    'Twitch',
    'Udyr',
    'Viego',
    'Yasuo',
    'Yone',
    'Zed',
];

let primeiraCarta = '';
let segundaCarta = '';



// criar um elemento no HTML e adicionar uma classe a ele
function criandoElemento(tag, nomeClass){
    const elemento = document.createElement(tag);
    elemento.className = nomeClass;
    return elemento;
}

// Criar as cartas
function criandoCarta(personagem){
    const carta = criandoElemento('div', 'carta');
    const frente = criandoElemento('div', 'face frente');
    const tras = criandoElemento('div', 'face tras');

    // colocando a imagens do personagem atras da carta
    frente.style.backgroundImage = `url('../images/${personagem}.png')`;

    carta.appendChild(frente);
    carta.appendChild(tras);

    carta.addEventListener('click', revelarCarta);

    carta.setAttribute('data-personagem', personagem);

    return carta;
}

// Verificar se o jogo acabou
function checarFinalJogo(){
    const cartasDesabilitadas = document.querySelectorAll('.carta-desabilitada');

    if ( cartasDesabilitadas.length == 30) {
        clearInterval(this.loop)
        alert(`Parabens, ${Spanjogador.innerHTML}!! Seu tempo foi: ${tempo.innerHTML} segundos`);
    }
}

// verificar se as cartas sao iguais
function checarCartas(){
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

    if (primeiroPersonagem == segundoPersonagem){
        primeiraCarta.firstChild.classList.add('carta-desabilitada');
        segundaCarta.firstChild.classList.add('carta-desabilitada');

        primeiraCarta = '';
        segundaCarta = '';
        
        setTimeout(() => {
            checarFinalJogo();
        }, 500);

    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('revelar-carta');
            segundaCarta.classList.remove('revelar-carta');

            primeiraCarta = '';
            segundaCarta = '';
        }, 500);
    }
}

// função para virar a carta
function revelarCarta({ target }){
    if (target.parentNode.className.includes('revelar-carta')){
        return;
    };

    if(primeiraCarta == ''){
        target.parentNode.classList.add('revelar-carta');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta == '') {
        target.parentNode.classList.add('revelar-carta');
        segundaCarta = target.parentNode;

        checarCartas();
    }

}

// Criar as cartas com os personagens dentro delas
function carregarJogo(){
    const persoangens_duplicados = [ ...personagens, ...personagens ];
    const lista_embaralhada = persoangens_duplicados.sort(() => Math.random() - 0.5);

    lista_embaralhada.forEach((personagem) => {
        const cartas_personagens = criandoCarta(personagem);
        tabueiro.appendChild(cartas_personagens);
    });
}

// comeca a carregar o tempo de jogo
function comecarTempo(){
    this.loop = setInterval(() => {
        const tempoAtual = +tempo.innerHTML;
        tempo.innerHTML = tempoAtual + 1
    }, 1000);
}

window.onload = () => {
    Spanjogador.innerHTML = localStorage.getItem('jogador');
    comecarTempo();
    carregarJogo();
}
