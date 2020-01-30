const helpers = {};

helpers.randomNumber = () =>{
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomNumber = 0;//le coloco let y no const xq va a estar cambiando su valor
    for(let i = 0; i < 6; i++){
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length)) //voy a selccionar un numero aleatorio, que este dentro de esta longitud y luego selecionare un caracter q este en dicha posicion, con Math.floor lo que hago es redondear hacia abajo cosa q me de un valor sin coma y pueda seleccionar un caracter

    }
    return randomNumber;
};

module.exports = helpers;