const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({ // constructor al cual le pasamos un objeto, el cual recibe estos parametros, estas propiedades vienen del mimo mongoose
    title: { type: String},
    description: { type: String},
    filename: { type: String},
    views: { type: Number, default: 0},
    likes: { type: Number, default: 0},
    timestamp: { type: Date, default: Date.now}
});

ImageSchema.virtual('uniqueId')  //variable virtual, no se almacena en la bd, con el "uniqueId le quito la extension al file name", cuando requiera una imgen solo me traera el Id y n toda le extencion
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '');    //la funcion nos retorna desde este modelo , x eso el "this", me retorna la prppiedad filename            
    });


module.exports = mongoose.model('Image', ImageSchema);  //esta imagen la tengo q converir en un modelo, esto con mongoose lo que hago es crear un nuevo modelo de imagen y que tomara el esquema que he creado

