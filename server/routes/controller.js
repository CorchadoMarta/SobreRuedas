//Fitxer controler.js

module.exports = function(app){
	inicio = function(req, res) {
		//Busquem les pelis
		res.sendFile('index.html', { root: __dirname });
	}
	//Funcio per a llistar totes les pelis
	llistaPelis = function(req, res) {
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

	//Per inserir la pelicula a la base de dades segons la seva clau
	var insertPeli = function(req, res) {
		//Guardem en una variable el recollit al form
		var claupeli = Number(req.body.codpeli);
		var titolpeli = req.body.titol;
		var sinopsipeli = req.body.sinopsi;
		//Creem una instancia per poder inserir la pelicula
		var peli = new pelis({
			codPeli: claupeli,
			titol: titolpeli,
			sinopsi: sinopsipeli
		});
		pelis.find({codPeli:claupeli}, function (err, pelicula) {
			if (!err && pelicula.length == 0){
				peli.save(function (err, pelicula) {
					if (!err){
						res.render('missatgeUpdateInsert.jade', {accio: "Insert"});
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
				console.log("No insert pelis.");
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
	app.get('/', inicio);
	//Aqui definim la collecció on insertarem coses: /videoclub
	//Per mostrar la llista de totes les pelis
	app.get('/list', llistaPelis);
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
	app.get('/insertOne', function(req, res) {
		res.render('formInsertPeli.jade');
	});
	app.post('/insertPeli', insertPeli);
	//Per cambiar una
	app.get('/updateOne', function(req, res) {
		res.render('formUpdatePeli.jade');
	});
	app.post('/updatePeli', updatePeli);

}
