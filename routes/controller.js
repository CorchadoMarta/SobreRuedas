//Fichero controler.js
var usuarios = require('../model/usuarios.js');
// var	session = require('express-session');



module.exports = function(app, passport){

	app.get('/logout',function(req,res){
		req.session.destroy(function(err) {
		    if(err) {
		    	console.log(err);
		    } else {
		    	res.redirect('/');
		    }
		});
	});

	app.get('/', function(req, res) {
		res.render('index.ejs',
		{botonRegistro: 'partials/registro'});
	});

	app.get('/registro', function(req, res) {
		res.render('registro.ejs',  { botonRegistro: 'partials/registro'});
	});
	
	app.get('/bienvenido', isLoggedIn , function(req, res) {
		res.render('bienvenido.ejs', { botonRegistro: 'partials/piolin'});

	});

	// process the login form
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/bienvenido', // redirect to the secure bienvenido section
        failureRedirect : '/registro', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/bienvenido', // redirect to the secure bienvenido section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
