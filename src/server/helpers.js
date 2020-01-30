//los helpers son funciones que reciben un dato lo procesan y me devuelven otra informacion, son funciones que puedo reutilizarla en mi vista
const moment = require('moment');
const helpers={};

helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow(); //con esta funcion lo que estoy haciendo es devolver el tiempo que lleva subida la imagen en minutos
};

module.exports = helpers;