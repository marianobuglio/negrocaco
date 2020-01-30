const ctrl = {}//con el cnotrolador home manejo las vistas de inicio

const { Image }= require('../models'); //importo el modelo image que esta en la carpeta models

const sidebar = require('../helpers/sidebar')

ctrl.index = async (req , res) =>{
    res.render('login');  
};

module.exports = ctrl;
