const boton20 = document.getElementById('boton20');
const boton40 = document.getElementById('boton40');
const boton60 = document.getElementById('boton60');
const input = document.querySelector('input');
const resetear = document.getElementById('resetear');
const nuevoDinero = document.getElementById('nuevoDinero');
const dineroServer = document.getElementById('dineroServer');
const botonEnviar = document.getElementById('botonEnviar');

nuevoDinero.innerText = '0 $';

const value20 = 20;
const value40 = 40;
const value60 = 60;

let totalDineroBotones = 0;

boton20.addEventListener('click', (e) => {
    totalDineroBotones += value20;
    nuevoDinero.innerText = totalDineroBotones +' $';
});

boton40.addEventListener('click', (e) => {
    totalDineroBotones += value40;
    nuevoDinero.innerText = totalDineroBotones +' $';
});

boton60.addEventListener('click', (e) => {
    totalDineroBotones += value60;
    nuevoDinero.innerText = totalDineroBotones +' $';
});

input.addEventListener('change', (e) => {
    const dinero = parseInt(e.target.value);
    totalDineroBotones += dinero;
    nuevoDinero.innerText = totalDineroBotones +' $';
});

resetear.addEventListener('click', (e) => {
    totalDineroBotones = 0;
    nuevoDinero.innerText = totalDineroBotones +' $';
});

botonEnviar.addEventListener('click', (e) => {
    dineroServer.value = totalDineroBotones;
    totalDineroBotones = 0;
});

const botonRetirar = document.getElementById('botonRetirar');
const inputResetear = document.getElementById('dineroRetirar');
const span = document.getElementById('mostrarRetirarDinero');
const inputServer = document.getElementById('retirarDineroServer');
const reseteaResetear = document.getElementById('resetearRetirada');

let dineroRetirar = 0;

span.innerText = '0 $';

inputResetear.addEventListener('change', (e) => {
    const dinero = parseInt(e.target.value);
    dineroRetirar += dinero;
    span.innerText = dineroRetirar +'$'
});

botonRetirar.addEventListener('click', (e) => {
    inputServer.value = dineroRetirar;
    dineroRetirar = 0;
});

reseteaResetear.addEventListener('click', (e) => {
    dineroRetirar = 0;
    span.innerText = dineroRetirar +'$';
});