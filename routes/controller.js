//Fichero controler.js
var usuarios = require('../model/usuarios.js');
// var	session = require('express-session');
var tests = require('../model/test.js');
// var	session = require('express-session');
var pagos = require('../model/pagos.js');
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

	app.get('/pepe', function(req, res) {
		tests.find({},{pregunta : 1, _id:0},function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            console.log(todos);
            res.json(todos);
        });
	});
	app.get('/practis', function(req, res) {
		pagos.find({userId: req.session.passport.user.id},{'practicas.practisData.fechPagoPract' : 1, _id:0},function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            console.log(todos);
            res.json(todos);
        });
	});


	app.get('/', function(req, res) {
		res.render('index.ejs',
		{botonRegistro: 'partials/registro'});
	});
	app.get('/test', function(req, res) {
		
		res.render('test.ejs',
		{botonRegistro: 'partials/piolin'});
	});

	app.get('/calendar',  isLoggedIn, function(req, res) {
		res.render('calendar.ejs',
		{botonRegistro: 'partials/piolin'});
	});

	app.get('/registro', function(req, res) {
		res.render('registro.ejs',  { botonRegistro: 'partials/registro'});
	});
	
	app.get('/bienvenido', isLoggedIn , function(req, res) {
		res.render('bienvenido.ejs', { botonRegistro: 'partials/piolin'});
		console.log(req.session.passport.user._id);

	});

	// process the login form
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/bienvenido', // redirect to the secure bienvenido section
        failureRedirect : '/registro', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/guardar', function(req, res){
    	console.log(req.body.time);
    	console.log(req.session.passport.user._id);
    	var pago1 = new pagos();
    	pago1.update({'userId': req.user._id},{ $set:{'practicas.practisData.$.fechPractica' : req.body.time}}, function (err) {
    		console.log("hola");
    	});
    	res.end();
    });
    

    app.get('*',notExists);

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

function notExists(req, res, next) {
  res.status(404).send('NO VAYAS POR AHI!');
}