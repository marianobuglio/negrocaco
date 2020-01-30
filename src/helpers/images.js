const {Image} = require('../models');

module.exports = { //esto es ES6
    async popular(){
        const images = await Image.find()
        .limit(3)
        .sort({likes: -1});
       return images; //me devuelve las imagenes mas populares
    }
};