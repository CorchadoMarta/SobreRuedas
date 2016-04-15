//Fichero controler.js
var usuarios = require('../model/usuarios.js');
// var	session = require('express-session');


module.exports = function(app, passport){

/*	var registrar = function(req, res) {
		
		var contenido = req.body;
		var usuario = new usuarios(contenido);
		usuario.direccion = contenido;
		usuario.markModified('direccion');
		console.log(contenido);
		usuario.save();
			var foto;
 
		if (!req.files) {
			res.send('No se subió tu foto.');
			return;
		}
	 
		foto = req.files.foto;
		foto.mv('/public/users', function(err) {
			if (err) {
				res.status(500).send(err);
			}
			else {
				res.send('Foto subida!');
			}
		});
	}*/
	//Funcio per a llistar totes les pelis
/*	llistaPelis = function(req, res) {
		//Busquem les pelis
		pelis.find(function (err, pelicules) {
			if (!err){
				//res.send(Pelicules);
				//Les mostrem enviantles al jade corresponent
				res.render('mostrarPelis.jade', {movies: pelicules});
				console.log("Mostrant pelis");
			} else {
				//res.send('Error' + err);
				console.log("No mostra pelis.");
			}
		});
	}

	//Per mostrar la pelicula de la base de dades segons la seva clau
	var mostraPeli = function(req, res) {
		//Guardem en una variable el recollit al form
		var claupeli = Number(req.body.codpeli);
		//Busquem aquesta pelicula
		pelis.find({codPeli:claupeli}, function (err, pelicules) {
			if (!err){
				//Mostrem la pelicula enviantlo al jade corresponent
				res.render('mostrarUnaPeli.jade', {movie: pelicules});
				//res.send(Pelicules);
				console.log("Mostrant peli");
			} else {
				//res.send('Error' + err);
				console.log("No mostra pelis.");
			}
		});
	}

	//Eliminar una pelicula de la base de dades
	var deletePeli = function(req, res) {
		//Guardem en una variable el recollit al form
		var idpeli = Number(req.body.codpeli);
		res.header("utf8");
		//Eliminem aquesta pelicula
		pelis.remove({codPeli:idpeli}, function (err){
			if(!err) {
				//res.send("Pelicula eliminada");
				res.render('missatgeEliminaCorrecte.jade', {movie: idpeli});
			} else {
				res.render('error.jade');
			}
		});
	}



	//Per cambiar la pelicula a la base de dades segons la seva clau
	var updatePeli = function(req, res) {
		//Recollim les dades del form
		var claupeli = Number(req.body.codpeli);
		var titolpeli = req.body.titol;
		var sinopsipeli = req.body.sinopsi;
		//Mirem si la pelicula
		pelis.find({codPeli:claupeli}, function (err, pelicula) {
			if (!err && pelicula.length != 0){
				pelis.update({codPeli:claupeli}, {$set: {titol: titolpeli, sinopsi: sinopsipeli}}, function (err, pelicula) {
					if (!err){
						res.render('missatgeUpdateInsert.jade', {accio: "Update"});
						//res.send(Pelicules);
						console.log("Mostrant pelis");
					} else {
						//res.send('Error' + err);
						console.log("No mostra pelis.");
					}
				});
				console.log("No la pots inserir");
			} else {
				//res.send('Error' + err);
				console.log("No update pelis.");
			}
		});
	}

*/
	// app.get('/logout',function(req,res){
	// req.session.destroy(function(err) {
	//   if(err) {
	//     console.log(err);
	//   } else {
	//     res.redirect('/');
	//   }
	// });

	app.get('/', function(req, res) {
		res.render('index.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/registro', function(req, res) {
		res.render('registro.ejs', { message: req.flash('signupMessage') });
	});
	app.get('/profile', function(req, res) {
		res.render('profile.ejs');
	});
/*	app.post('/registrar', registrar);*/
	// process the login form
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/registro', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

/*	app.get('/list', llistaPelis);
	//Per mostrar una
	app.get('/listOne', function(req, res) {
		res.render('formMostrarPeli.jade');
	});
	app.post('/mostraPeli', mostraPeli);
	//Per eliminar una
	app.get('/deleteOne', function(req, res) {
		res.render('formEliminarPeli.jade');
	});
	app.post('/deletePeli', deletePeli);
	//Per inserir una
	//Per cambiar una
	app.get('/updateOne', function(req, res) {
		res.render('formUpdatePeli.jade');
	});
	app.post('/updatePeli', updatePeli);
	    // process the signup form*/
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
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
