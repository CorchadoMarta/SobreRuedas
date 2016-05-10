// Fichero controler.js
var usuarios = require('../model/usuarios.js');

var tests = require('../model/test.js');

var practicas = require('../model/practicas.js');

var pagos = require('../model/pagos.js');

var userTest = require('../model/userTest.js');

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
         {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});
    });
    
    app.get('/datosUser',  isLoggedIn, function(req, res) {
       usuarios.find({'_id': req.user._id},{email: 1, nombre: 1, apellidos: 1, tel: 1, fechNacimiento: 1, dni: 1, direccion: 1} ,function(err, usuario) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(usuario);
        });
   });
    

    app.get('/registro', function(req, res) {
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/BotonRegistro'});
    });
    app.get('/registro:num', function(req, res) {
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/BotonRegistro'});
    });

    app.get('/bienvenido', isLoggedIn , function(req, res) {

        var role = req.user.role;
        res.render('bienvenido.ejs',
         {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});

    });

    app.get('/alumnos', isLoggedIn , function(req, res) {
        var role = req.user.role;
        res.render('alumnos.ejs',
         {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});
    });

    app.post('/buscar', isLoggedIn , function(req, res) {
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
