const botonRetirar = document.getElementById('botonRetirar');
const input = document.getElementById('dineroRetirar');
const span = document.getElementById('mostrarRetirarDinero');
const inputServer = document.getElementById('retirarDineroSever');
const resetear = document.getElementById('resetearRetirada');

let dineroRetirar = 0;

span.innerText = '0 $';

input.addEventListener('change', (e) => {
    const dinero = parseInt(e.target.value);
    dineroRetirar += dinero;
    span.innerText = dineroRetirar +'$'
});

botonRetirar.addEventListener('click', (e) => {
    inputServer.value = dineroRetirar;
    dineroRetirar = 0;
});

resetear.addEventListener('click', (e) => {
    dineroRetirar = 0;
    span.innerText = dineroRetirar +'$';
});