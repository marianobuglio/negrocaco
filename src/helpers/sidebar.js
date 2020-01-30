const Stats = require('./stats'); //importo un modelo de datos por eso pongo el nombre de la const en Mayuscula
const Images = require('./images');
const Comments = require('./comments');

module.exports = async function(viewModel){//funcion que toma un modelo de datos, en nuestro caso el viewmodel de images.js que esta en controllers
    
    const results = await Promise.all([
        Images.popular(),
        Stats(),
        Comments.newest()

    ]);
    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };
    return viewModel; 
}