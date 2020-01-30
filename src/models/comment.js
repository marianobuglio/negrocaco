const {Schema,model} = require('mongoose');
const{ObjectId} = Schema;
//cuando hago un comentario no lo puedo hacer asi xq si, lo que hago es guardar su id y relacionarlo con el comentario de la imagen a la cual esta haciendo referencia ese ID
const CommentSchema = new Schema({
    image_id: {type: ObjectId},
    email: {type: String},
    name: {type: String},
    gravatar:{type: String}, //libreria utilizada en la que te logueas y queda tu email conuna imagen que le coloques, es un servicio de wordpress 
    comment: {type: String},
    timestamp: {type: Date, default: Date.now}
});

module.exports = model('Comment', CommentSchema);