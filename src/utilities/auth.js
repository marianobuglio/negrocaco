
var logout = function(req,res){
    req.session.destroy()
    return res.render('login');
}

var login = function(req, res) { // login 
    if (req.body && req.body.usuario == "negro" && req.body.passwords == 'caco'){
      req.session.user = "negro";
      res.locals.loggedIn = true;
      console.log(req.session.user)
      return res.redirect('/');
    }
    else
      return res.render('login',{info:'Usuario o contrasenia invalida'});
  };

  var isLogged = function(req,res,next){ // esta logueado ??
    if(req.session.user){
      console.log("entre log")
      return next()
    }else{
      return res.render('login');
    }
  }
  module.exports = {
    login ,
    isLogged,
    logout
  }