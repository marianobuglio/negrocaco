//primera parte para la config de express
const express = require('express');

const config = require('./server/config');


//base de datos
require('./database');//va a ejecutar el codigo q esta en database

const app = config(express());//devuelve objeto

//inicio - configurar servidor
app.listen(app.get('port',),() => {
    console.log('Server on port', app.get('port'));
});