const mongoose = require('mongoose');
      //database solo va a devolcer el objeto que se encuentra en keys  
const {database} = require('./keys')//importo las claves de mi bd, importo database, en llave xq es una destructuracion en js ya que no voy a acceder a todo el objeto sino a parte de ese objeto

mongoose.connect(database.URI,{
    useNewUrlParser: true
})// de esta forma obtengo la direccion de mongodb
    .then(db => console.log('DB is connected'))//PROMESA: la utilizo para avisarme q la base de datos esta conectada
    .catch(err => console.error(err));