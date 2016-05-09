var express 	 = require('express'),
/*    fs 		 	 = require('fs'),
    https 		 = require('https'),
    helmet 	 	 = require('helmet'),*/
    compress 	 = require('compression'),
    bodyParser 	 = require('body-parser'),
    mongoose 	 = require('mongoose'),
    passport 	 = require('passport'),
    flash    	 = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    app 		 = express();


// variables para declara un servidor https

/*var key = fs.readFileSync('fixtures/keys/localhost.key');
var cert = fs.readFileSync('fixtures/keys/localhost.crt');
var options = {
    key: key,
    cert: cert
};*/

// declaración de variables que nos servirán en el despliegue en openshift
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + 'autoescuela';
// utilización del as variables de openshift cuando estén disponibles
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'autoescuela';
}

// configuración inicial para la conexión al servidor mongo mediante mongoose
mongoose.connect(mongodb_connection_string, function(err, res){
    if (!err)
        console.log("Conexión establecida!");
    else
        console.log("SIN conexión");
});

// imprime cualquier consulta por la consola
app.use(morgan('dev')); 
// añade módulos de seguridad
// app.use(helmet());

// lee las cookies (necesario para autenticar)
app.use(cookieParser()); 

// comprime los datos que envíamos
app.use(compress()); 

// inicia ejs para el renderizado de las plantillas
app.set('view engine', 'ejs');

// declaramos la dirección de las plantillas
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
/*app.set('view options', { layout: false });*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// necesario para passport
app.use(session({ secret: 'batmanesbrucewayne' })); 
app.use(passport.initialize());

// sesiones de login persistentes
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// necesario para la utilización de passport
require('./config/passport')(passport);
require('./routes/controller.js')(app, passport);

// definición del puerto
app.listen(2626, function() {
    console.log("Rulamos en el 2626!!");
});

// difinición para el uso de ssl
/*https.createServer( options, app).listen(4444);*/





