const path = require('path');
const { randomNumber} = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require ('../models'); //solo necesito models/index, ya que el archivo index de la carpeta models esta haciendo referenca a Images
const sidebar = require('../helpers/sidebar');

const ctrl = {}; //obj del controlador de todas la imagenes, es decir todos los datos que subamos desde el formulario llegan aca, entonces estas fucniones son las encargadas de manejar, analizar los datos y almacenrla

//controlador que se encarga de renderizar la vista principal
ctrl.index = async (req, res) => { //consulta asincrona
    let viewModel = { image: {}, comments: {}};
    
    const image = await Image.findOne({filename: { $regex: req.params.image_id } }); //el regex lo que hace es buscarme una coincidencia, en el cual va a trearme esa coincidencia a traves del id, sin importar la extencion 
    if (image) { //forma de validar la imagen, ya que si buscamos cualquier id en la url q no existe nos redirecciona a la pagina de inicio
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({image_id:image._id});
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);  
        res.render('image',{ image, comments }); 
    }else{
        res.redirect('/');
    }

    //console.log('params:', req.params.image_id) //concateno el id de la imagen con los parametros a traves de 'params:s' 
    //res.send('Index page');
};


ctrl.create = (req, res) =>{
    //uso de recursividad para la validacion de las imagenes repetidas, se va a augardar una img, se ejecuata la funcion del numero aleaotiro que se guarda en una const se va a validar, si ese nume aleatorio encuentra una coincidencia, se vuelve a ejecuar saveimage, y vuelve a generar otro nombre aleatorio y va a volver a consultar a la bd, si ese nombre se repite nuevamnte , va a volver a ejecutar la funcion, si ya no encuentra otra coicidencia entonces guarda la imagen
    const saveimage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({filename: imgUrl}); //validacion para ver si el id de las imagenes se repite 
        if(images.length > 0 ){
    }else{
        console.log(imgUrl);
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase(); // con el req.file.origime obtendremos la extension de la imagen,//console.log(req.file); // con esto vemos que estamos reciebiendo con el req.file, es decir cunaod multer suba la imagen, con el onj req.file veremos la informcion de la imagen, extension, tamano,etc
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)
       
        if(ext === '.png'|| ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){ //validacion de las extensiones 
            await fs.rename(imageTempPath, targetPath); //rename lo utilizo para mover archivo de un directorio a otro, esyo funciona con async-await
            const newImg = new Image({
                title: req.body.title,
                filename: imgUrl + ext, //nombre de archivo dentro del servidor
                description: req.body.description
            });
            const imageSave = await newImg.save();
            res.redirect('/images/' + imgUrl);
        }   else{
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Solo se permiten imagenes'}); //pequena validacion para archivos temporales
    
        } 
        //res.send('subido!'); //para que el navegador no se quede cargando, y al subirla nos muestra la palabra works notificando que se subio 
       //si tuviera otras vistas podria redireccionarlo
    }
       
};    
    
    saveimage();

};    


    

ctrl.like = async(req, res) =>{ //este controlador lo que hace es buscar la imagen por id
    const image = await Image.findOne({filename: {$regex: req.params.image_id}}) //busca todas las imagenes que cumplan con el id que le estan pasando
    if (image) { //validacion
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes: image.likes}); //recibe todos los likes q ha recibido la imagen
    }else{
        res.status(500).json({error: 'Error'});        
        
    }
   
};

ctrl.comment = async (req, res) =>{
    const image = await Image.findOne({filename:{$regex:req.params.image_id}});
    if (image) {
        const newComment = new Comment(req.body); //creamos un obj para los comentarios
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    } else{
        res.redirect('/');
    }
    
    //console.log(newComment);
    //console.log(req.params.image_id);//estas dos lineas son lo mismo que la primera linea de arriba
   
   
};

ctrl.remove = async (req, res) => {
    try {
        const image = await Image.findOne({filename: {$regex: req.params.image_id}});
        if (image) {s
            await fs.unlink(path.resolve('./src/public/upload/' + image.filename)); //el metodo unlink remueve un dato a partir de una direccion q le de
            await Comment.deleteOne({image_id: image._id});
            await image.remove();
            res.json(true);
        }
    } catch (error) {
        res.status(400).send({message:'error al eliminar imagen.'})
    }
    
    //console.log(req.params.image_id);
   
}; 


module.exports = ctrl;
