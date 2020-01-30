const { Comment, Image } =  require('../models');

module.exports = {

    async newest(){ //me devuelve un arreglo de comentarios
        const comments = await Comment.find()
                .limit(5)
                .sort({timestamp: -1}); //de lo mas novedoso a lo menos novedoso
        for(const comment of comments){
            const image = Image.findOne({_id: comment.image_id});    
            comment.image = image;
        }    
        return comments;
    }

};