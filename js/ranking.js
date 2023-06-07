const menu = document.querySelector('.menu');

menu.onclick = function b_menu(){
    window.location = '../index.html'
};

// fazer função para receber o nome e tempo do player

function player(nome, tempo) {
    return{
        nome,
        tempo
    };
}