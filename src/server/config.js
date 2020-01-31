const path = require('path');//modulo path de node
const exphbs = require('express-handlebars');

var session = require('express-session');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');//no para servidor sino para importar middlewares
const errorhandler = require('errorhandler');
const cookieParser = require('cookie-parser');

const routes = require('../routes/index');
    //routes es una funcion

module.exports = app => {
    
    //Settings
    app.set('port', process.env.PORT || 3000); //lo que hago es asignar un puerto, si existe lo uso sino uso el 3000
    app.set('views',path.join(__dirname,'../views'));//el path me permite unir directorios, dirname en src con la carpeta views, de esta forma node sabe donde estan las vistas
    app.engine('.hbs', exphbs({  
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'),'layouts'),
        extname:'.hbs',//extension de los archivos
        helpers: require('./helpers') //los helpers son funciones que reciben un dato lo procesan y me devuelven otra informacion
        
        //en las dos primeras lines lo que estoy diciendo es que la carpeta partials y layuots que se encuentran en la carpeta views se concatenen
    }))
    app.set('view engine','hbs')//motor de plantillas
    

    //middlewares

    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
      }))
    app.use(morgan('dev'))//configuracion dev
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));//dest(destino),concateno dirname, '../public/upload/temp'= lo que estoy diciendo aqui es q suba un nivel,entre en la carpeta unpload y dentro de la carpeta temp (temopral) coloque las imgenes, de esta forma la puedo mover 
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());//metodo json, manejo los likes a traves de ayax que me envia objetos
  
    //routs
    routes(app);//app se lo paso a touts

    //static files
    app.use('/public', express.static(path.join(__dirname,'../public')));


    //errohandlers
    if ('development' == app.get('env')){
        app.use(errorhandler);

    } //esto me devuelve el entorno en donde estoy, ej produccion me devuelve production

    return app;
}