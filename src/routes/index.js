const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');
const auth = require('../utilities/auth')
const { Image }= require('../models');
const sidebar = require('../helpers/sidebar')
module.exports= app => {

    router.get('/',auth.isLogged,home.index);//ruta principal, encargada de listar todas las imag
    router.get('/images/:image_id', image.index);//lsita solo una imagen, soloesta ruta lo q me indica es que cuando necesite una imagen a la bd a traves del ID, el home. es el procesador
    router.post('/images', image.create);//ruta para subir imagenes, en cada ruta se coloca la funcion image.create, si te vas a la carpeta controlers en el archivo image.js veras las funciones para procesar los datos
    router.post('/images/:image_id/like', image.like); //en controlers esta el controlador image.like
    router.post('/images/:image_id/comment', image.comment);
    router.post('/login', auth.login)
    router.get('/logout', auth.logout)
    router.delete('/images/:image_id', image.remove);//para eliminar una imagen en especial


    app.use(router);
};