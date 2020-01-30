const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');
const auth = require('../utilities/auth')
const { Image }= require('../models');
const sidebar = require('../helpers/sidebar')
module.exports= app => {

    router.get('/',home.index);//ruta principal, encargada de listar todas las imag
    router.get('/images/:image_id', image.index);//lsita solo una imagen, soloesta ruta lo q me indica es que cuando necesite una imagen a la bd a traves del ID, el home. es el procesador
    router.post('/images', image.create);//ruta para subir imagenes, en cada ruta se coloca la funcion image.create, si te vas a la carpeta controlers en el archivo image.js veras las funciones para procesar los datos
    router.post('/images/:image_id/like', image.like); //en controlers esta el controlador image.like
    router.post('/images/:image_id/comment', image.comment);
    router.post('/login',auth.auth, async function(req,res){
        const images = await Image.find().sort({timestamp: -1}); //peticion asincrona a la base de datos que me devuelve las imagenes de mi bd. con el timestamp que lo tengo en el schema de la imagen, lo que hago es ordenarlo de forma ascendente o descendente
        let viewModel = {image: []};
        viewModel.images = images;
        viewModel = await sidebar(viewModel);
        console.log(viewModel);
        res.render('index',viewModel);  
    });
    router.delete('/images/:image_id', image.remove);//para eliminar una imagen en especial


    app.use(router);
};