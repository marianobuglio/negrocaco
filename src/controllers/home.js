const ctrl = {}//con el cnotrolador home manejo las vistas de inicio

const { Image }= require('../models'); //importo el modelo image que esta en la carpeta models

const sidebar = require('../helpers/sidebar')

ctrl.index = async (req , res) =>{
         const images = await Image.find().sort({timestamp: -1}); //peticion asincrona a la base de datos que me devuelve las imagenes de mi bd. con el timestamp que lo tengo en el schema de la imagen, lo que hago es ordenarlo de forma ascendente o descendente
        let viewModel = {image: []};
        viewModel.images = images;
        viewModel = await sidebar(viewModel);
        console.log(viewModel);
        res.render('index',viewModel);
};

module.exports = ctrl;
