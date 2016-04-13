//middleware
var express = require('express'),
	bodyParser = require('body-parser'),
	//methodOverride = require('method-override'),
	mongoose = require('mongoose'),
	//Instancia de l'objecte express
	app = express();
	app.use(express.static(__dirname + '/public'));

	//Configurem per poder utilitzar forms i direccionar a la carpeta de views
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
	
	//Missatge per donar la benbinguda ('/' és l'endpoint)
	// app.get('/', function(req, res) {
		//res.send("Benvingut al videoclub");
		//DIRECCIONEM al nostre index per mostrar les opcions
		// res.render('index.jade');
	// });

	//Connexió a la base de dades
	mongoose.connect('mongodb://localhost/autoescuela', function(err, res){
		if (!err)
			console.log("Connexión establecida");
		else 
			console.log("SENSE connexió");
	});

	//Pasant el control del app al controller
	require('./routes/controller.js')(app);
	app.listen(2626, function() {
		console.log("Server running in 2626");
	});
	