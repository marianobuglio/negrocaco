//modulo estadisticas

const { Comment, Image} = require('../models');
//funcion de cuantas imagens tengo en el sitio
async function imageCounter(){
    return await Image.countDocuments();

}

//contador de los comentarios

async function commentsCounter(){
    return await Comment.countDocuments();


}

//funcion contadora de las vistas de las imagenes
async function imageTotalViewsCounter(){
    const result = await Image.aggregate([{
        $group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);
    //esta consulta lo que hace es tomar cada imagen que tenemos en el sitio y en el propiedad de las vistas (views) va a ir contanto esos valores y la devuelve en viewstotal
    
    return result[0].viewsTotal; //result lo q devuele es un arrelgo el cual tiene un obj el cual tiene una prop id y una prop que sera el total de las vistas
}

//funcion que devuelve todos los likes de todas las imagenes
async function likesTotalCounter(){
    const result = await Image.aggregate([{
        $group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
        }
    }]);
    return result[0].likesTotal;
}

module.exports = async () => {

    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]); //cart de asyn-await, me permite ejecutar varias funciones al mismo tiempo en paralelo, no esperan que una termine para que se ejecuten las demas funciones  

    return{
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]

    }

}