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

    app.get('/pepe', isLoggedIn , function(req, res) {
        tests.find({},{pregunta : 1, _id:0},function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                res.json(todos);
        });
    });

    app.get('/practis', isLoggedIn , function(req, res) {
        practicas.find( function(err, Todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                res.json(Todos);
        });
    });

    app.get('/pagos', isLoggedIn , function(req, res) {
        console.log(req.user._id);
        pagos.find({'userId': req.user._id}, function(err, practis) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                res.json(practis);
        });
    });




    app.get('/', function(req, res) {
        res.render('index.ejs',
                   {botonRegistro: 'partials/publico/BotonRegistro'});
    });
    app.get('/test', isLoggedIn, function(req, res) {
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
    app.get('/registro:num', function(req, res) {
        console.log(req);
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/BotonRegistro'});
    });

    app.get('/bienvenido', isLoggedIn , function(req, res) {

        var role = req.user.role;
        res.render('bienvenido.ejs',
                   {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});
        console.log(req.session.passport.user._id);

    });

    app.get('/alumnos', isLoggedIn , function(req, res) {
        var role = req.user.role;
        res.render('alumnos.ejs',
                   {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});
    });

    app.get('/buscar', isLoggedIn , function(req, res) {
        var nombre = req.body.name;
        var spacesQuer = nombre.replace(/\w{1,}/, ".*"); 
        usuarios.find({$or: [ {'nombre': {$regex:spacesQuer, $options : 'i' }}, {'dni': req.body.dni} ] }, function(err, practis) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                res.json(practis);
        });
        usuarios.find({'nombre': req.body.name}, function(err, practis) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                res.json(practis);
        });
    });


    /*    app.post('/busca', isLoggedIn, function(req, res){
        usuarios.find({'userId': req.user._id}, function(err, practis) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                numPracticasComp = parseInt(req.body.uni) + parseInt((req.body.pack * 10));
            console.log(req.body.uni +"uni  pack  " +(req.body.pack * 10));
            pagos.update({'userId': req.user._id}, { $inc : { numPracticasTotalPagadas:  numPracticasComp }}, function(err) {
                if (err){
                    res.send(err)
                    console.log('MAL updateado');
                } else{

                    console.log("updateado");
                    res.redirect('/calendar');
                }

            });

        });
    });*/

    // process the login form
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/bienvenido', // redirect to the secure bienvenido section
        failureRedirect : '/registro', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/comprar', function(req, res, next){

        pagos.find({'userId': req.user._id}, function(err, practis) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                numPracticasComp = parseInt(req.body.uni) + parseInt((req.body.pack * 10));
            console.log(req.body.uni +"uni  pack  " +(req.body.pack * 10));
            pagos.update({'userId': req.user._id}, { $inc : { numPracticasTotalPagadas:  numPracticasComp }}, function(err) {
                if (err){
                    res.send(err)
                    console.log('MAL updateado');
                } else{

                    console.log("updateado");
                    res.redirect('/calendar');
                }

            });

        });

    });

    app.post('/guardar', function(req, res){

        pagos.find({'userId': req.user._id}, function(err, practis) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                if(practis[0].numPracticasTotalPagadas > practis[0].practicas.length){
                    var endtime = new Date(req.body.time); 
                    endtime.setMinutes(endtime.getMinutes() + 45);
                    var practica = new practicas({'userId': req.user._id, 'startTime' : req.body.time, 'endTime' : endtime, 'title' : req.user.nombre});
                    practica.save(function(err) {
                        pagos.update({'userId': req.user._id}, { $push : { practicas: practica.id}}, function(err) {
                            if (err){
                                res.send(err)
                                console.log('MAL updateado');
                            } else{

                                console.log("updateado");
                                res.end();
                            }

                        });

                    });

                };
            res.end();

        });



    });

    app.post('/borrar', function(req, res){
        practicas.remove({'userId': req.user._id, '_id': req.body.practId }, function(err) {
            if (err){
                res.send(err)
                console.log('MAL borrado');
            } else{

                pagos.update({'userId': req.user._id}, { $pull : { practicas: req.body.practId }}, function(err) {
                    if (err){
                        res.send(err)
                        console.log('MAL updateado');
                    } else{

                        console.log("updateado");
                        res.end();
                    }

                });

                console.log("borrado");
            };

            res.end();
        });


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
