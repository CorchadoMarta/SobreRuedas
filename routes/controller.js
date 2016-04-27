//Fichero controler.js
var usuarios = require('../model/usuarios.js');
// var	session = require('express-session');
var tests = require('../model/test.js');
// var	session = require('express-session');
var practicas = require('../model/practicas.js');
// var	session = require('express-session');
var pagos = require('../model/pagos.js');

module.exports = function (app, passport){

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
        practicas.find({userId: req.user._id},function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                console.log(todos);
            res.json(todos);
        });
    });


    app.get('/', function(req, res) {
        res.render('index.ejs',
                   {botonRegistro: 'partials/publico/BotonRegistro'});
    });
    app.get('/test', function(req, res) {
        var role = req.user.role;
        res.render('teorica.ejs',
                   {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre, testUser: 'partials/' + role + '/testUser.ejs'});
    });

    app.get('/calendar',  isLoggedIn, function(req, res) {
         var role = req.user.role;
        res.render('practicas.ejs',
                   {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre, calendarUser: 'partials/' + role + '/calendar.ejs'});
    });

    app.get('/registro', function(req, res) {
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/BotonRegistro'});
    });

    app.get('/bienvenido', isLoggedIn , function(req, res) {
         var role = req.user.role;
        res.render('bienvenido.ejs',
                   {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});
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
        var endtime = new Date(req.body.time); 
        endtime.setMinutes(endtime.getMinutes() + 45);
        var practica = new practicas({'userId': req.user._id, 'startTime' : req.body.time, 'endTime' : endtime});
        practica.save( function (err) {
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
