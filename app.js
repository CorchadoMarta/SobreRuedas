var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/autoescuela', function(err, res){
	if (!err)
		console.log("Conexión establecida");
	else 
		console.log("SENSE connexió");
});


require('./routes/controller.js')(app);
app.listen(2626, function() {
	console.log("Server running in 2626");
});
	