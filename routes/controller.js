// Fichero controler.js
var usuarios = require('../model/usuarios.js');

var tests = require('../model/test.js');

var practicas = require('../model/practicas.js');

var pagos = require('../model/pagos.js');

var userTest = require('../model/userTest.js');

var nodemailer = require('nodemailer');

var mg = require('nodemailer-mailgun-transport');

var schedule = require('node-schedule');



module.exports = function (app, passport){



    var auth = {
      auth: {
        api_key: 'key-d1833c38c633fd419bc1b153dc646a7e',
        domain: 'sandboxb03aac7bff2740b6b02096754ca89497.mailgun.org'
        }
    }

    var nodemailerMailgun = nodemailer.createTransport(mg(auth));

    var j = schedule.scheduleJob('00 21 * * 1,2,3,4,5', function(){
      nodemailerMailgun.sendMail({
          from: 'noreply@sobreruedas.com',
              to: ['sobreruedas.dova@gmail.com', 'sobre.ruedas.autoescuela@gmail.com', 'gcatram@gmail.com'], // An array if you have multiple recipients.
              subject: 'Este es un mail de bienvenida!!!!',
              text: 'Aquí va un texto de prueba donde hay que poner algo, algo como que tengo la mejor compañera de proyecto (como tú dirías) del MUNDO MUNDIAL!! ;) ',
          }, function (err, info) {
              if (err) {
                console.log('Error: ' + err);
            }
            else {
                console.log('Response: ' + info);
            }
        });
    });

    j;

    app.get('/logout',function(req,res){
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });

    });

    app.get('/tests', isLoggedIn , function(req, res) {
        tests.find({},function(err, todos) {

                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                res.json(todos);
            });
    });

    app.get('/practis', isLoggedIn , function(req, res) {
        practicas.find( function(err, Todos) {

                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                res.json(Todos);
            });
    });

    app.post('/pagos', isLoggedIn , function(req, res) {
        console.log(req.body);
        pagos.find({'userId': req.body._id}, function(err, practis) {
                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                console.log(practis);
                res.json(practis);
            });
    });

    app.post('/examenes', isLoggedIn , function(req, res) {
        var cosas = req.body;
        var useId = cosas.user;
        delete cosas.user;

        console.log(req.body.tipo);

        if(req.body.tipo){
                    delete cosas.tipo;
        pagos.update({'userId': useId}, {$push :  { examenPractico : cosas }}, function(err) {
                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                console.log('salio bien');
                res.end();
            });

        } else {
                    delete cosas.tipo;
        pagos.update({'userId': useId}, {$push :  { examenTeorico : cosas }}, function(err) {
                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                console.log('salio bien');
                res.end();
            });
    }
    });

    app.get('/pagos', isLoggedIn , function(req, res) {
        pagos.find({'userId': req.user._id}, function(err, practis) {
                // si hay un error se envía. no se ejecutará nada después de res.send(err)
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

    app.get('/perfil',  isLoggedIn, function(req, res) {
        var role = req.user.role;
        res.render('profile.ejs',
           {botonRegistro: 'partials/'+ role + '/botonUser', nombre: ""});
    });

    app.get('/datosUser',  isLoggedIn, function(req, res) {
        usuarios.find({'_id': req.user._id},{email: 1, nombre: 1, apellidos: 1, tel: 1, fechNacimiento: 1, dni: 1, direccion: 1} ,function(err, usuario) {
                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                res.json(usuario);
            });
    });

    app.post('/editaDatosUser', function(req, res){
        console.log(req.body);
        usuarios.update({'_id': req.user._id}, { $set : req.body}, function(err) {
            if (err){
                res.send(err)
                console.log('MAL updateado');
            } else{
                console.log("updateado");
                res.redirect('/perfil');
            }

        });
    });

    app.get('/testsDelUser',  esAlumno, function(req, res) {
        userTest.find({'userId': req.user._id} ,function(err, tests) {
                    // si hay un error se envía. no se ejecutará nada después de res.send(err)
                    if (err)
                        res.send(err)
                    res.json(tests);
                });
    });

    app.get('/teorica', function(req, res) {
        res.render('teoricaPublic.ejs',  { botonRegistro: 'partials/publico/BotonRegistro'});
    });
    
    app.get('/registro', function(req, res) {
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/BotonRegistro'});
    });
    
    app.get('/registro:num', function(req, res) {
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/BotonRegistro'});
    });

    app.get('/bienvenido', isLoggedIn , function(req, res) {
        console.log(req.session);
        var role = req.user.role;
        res.render('bienvenido.ejs',
           {landing: 'partials/'+ role + '/entrada.ejs' , botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});

    });

    app.get('/alumnos', esAdmin , function(req, res) {
        var role = req.user.role;
        res.render('alumnos.ejs',
           {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});
    });

    app.post('/buscar', esAdmin , function(req, res) {
        var nombre = req.body.nombre;
        if (nombre == undefined || nombre == ''){
            nombre = 4;
        }
        usuarios.find({$or: [ {'nombre': {$regex:nombre, $options : 'i' }}, {'dni': req.body.dni} ] }, function(err, practis) {
                    // si hay un error se envía. no se ejecutará nada después de res.send(err)
                    if (err)
                        res.send(err)
                    res.json(practis);

                });
    });

    // se envía el formulario de registro
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/bienvenido', // si va bien se redirecciona hacia bienvenido
        failureRedirect : '/registro', // si hay algún error vuelve al formulario de registro
        failureFlash : true // permiso para los mensajes flash
    }));

    app.post('/comprar', function(req, res, next){

        pagos.find({'userId': req.user._id}, function(err, practis) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            numPracticasComp = parseInt(req.body.uni) + parseInt((req.body.pack * 10));      
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



    app.post('/guardarTest', function(req, res){

        console.log(req.body);

        var testUser = new userTest({'userId': req.user._id, 'fallos' : req.body.fallos, 'idTema' : req.body.idTema});
        testUser.save(function(err) {
            if (err){
                res.send(err)
                console.log('MAL guardado el test');
            } else{
                usuarios.update({'_id': req.user._id}, { $push : { 'test': testUser.id}}, function(err) {
                    if (err){
                        res.send(err)
                        console.log('MAL updateado en el usuario');
                    } else{

                        console.log("updateado el usuario");
                        res.end();
                    }

                });
                console.log("guardado test");
                res.end();
            }


        });

        res.end();


    });

    app.post('/guardar', function(req, res){

        pagos.find({'userId': req.user._id}, function(err, practis) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
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
        successRedirect : '/bienvenido', // si va bien se redirecciona hacia bienvenido
        failureRedirect : '/', // si hay algún error vuelve ala página de inicio
        failureFlash : true // permiso para los mensajes flash
    }));
};

// middleware para asegurarnos que el usuario está logueado
function esAlumno(req, res, next) {

    // si el usuario está autenticado continuamos 
    if (req.isAuthenticated() && req.user.role == "alumno"){
        console.log(req.user.role)
        return next();
    }

    // si no lo está, se redirecciona al inicio
    res.redirect('/');
}

function esProfe(req, res, next) {

    // si el usuario está autenticado continuamos 
    if (req.isAuthenticated() && req.user.role == "profe"){
        console.log(req.user.role)
        return next();
    }

    // si no lo está, se redirecciona al inicio
    res.redirect('/');
}

function esAdmin(req, res, next) {

    // si el usuario está autenticado continuamos 
    if (req.isAuthenticated() && req.user.role == "admin"){
        console.log(req.user.role)
        return next();
    }

    // si no lo está, se redirecciona al inicio
    res.redirect('/');
}

function isLoggedIn(req, res, next) {

    // si el usuario está autenticado continuamos 
    if (req.isAuthenticated())
        return next();

    // si no lo está, se redirecciona al inicio
    res.redirect('/');
}

function notExists(req, res, next) {
    res.status(404).send('NO VAYAS POR AHI!');
}
