//index.js es un indice de todos los modelos de datos que voy a tener
module.exports ={

        Image: require('./image'), // este index esta llamando a "imageSchema", con el cual tengo acceso a todo el modelo solo a traves del mudolo image, 
        Comment: require('./comment')        

};