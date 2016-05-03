var express 	 = require('express'),
    /*fs 		 	 = require('fs'),
    https 		 = require('https'),*/
    helmet 	 	 = require('helmet'),
    compress 	 = require('compression'),
    bodyParser 	 = require('body-parser'),
    mongoose 	 = require('mongoose'),
    passport 	 = require('passport'),
    flash    	 = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    app 		 = express();



/*var key = fs.readFileSync('fixtures/keys/localhost.key');
var cert = fs.readFileSync('fixtures/keys/localhost.crt');
var options = {
    key: key,
    cert: cert
};*/

// comprime los datos que envíamos
app.use(compress()); 
app.use(morgan('dev')); // log every request to the console
// añade módulos de seguridad
app.use(helmet());

app.use(cookieParser()); // read cookies (needed for auth)

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + 'autoescuela';
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'autoescuela';
}



mongoose.connect(mongodb_connection_string, function(err, res){
    if (!err)
        console.log("Conexión establecida");
    else
        console.log("SENSE connexió");
});

// required for passport
app.use(session({ secret: 'batmanesbrucewayne' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport);
require('./routes/controller.js')(app, passport);



app.listen(2626, function() {
    console.log("Server running in 2626");
});

/*https.createServer( options, app).listen(4444);*/





