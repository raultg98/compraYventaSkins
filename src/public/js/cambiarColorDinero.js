const dineroRestante = document.getElementById('dineroRestante');

const dinero = parseInt(dineroRestante.innerText.split(' '));

if(dinero < 0){
    dineroRestante.setAttribute('class', 'text-danger');
}else {
    dineroRestante.setAttribute('class', 'text-primary');
}