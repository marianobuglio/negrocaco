var auth = function(req, res, next) {
    if (req.body && req.body.usuario == "negro" && req.body.passwords == 'caco')
      return next();
    else
      return res.render('login',{info:'Usuario o contrasenia invalida'});
  };

  module.exports = {
    auth 
  }