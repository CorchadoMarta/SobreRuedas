// Fichero controler.js

// variables que inician los modelos de la base de datos
var usuarios = require('../model/usuarios.js');

var tests = require('../model/test.js');

var practicas = require('../model/practicas.js');

var pagos = require('../model/pagos.js');

var userTest = require('../model/userTest.js');

var nodemailer = require('nodemailer'); //Envia mails

var mg = require('nodemailer-mailgun-transport'); //Enlaza con un servidor que envia mails, y asi no necesitamos una cuenta de verdad

var schedule = require('node-schedule'); //PLanifica horario para ejecutar funcion



module.exports = function (app, passport){

    //Datos de Mailgun (mg)
    var auth = {
        auth: {
            api_key: 'key-d1833c38c633fd419bc1b153dc646a7e',
            domain: 'sandboxb03aac7bff2740b6b02096754ca89497.mailgun.org'
        }
    }
    //Relaciona Nodemailer con el transporte Mailgun
    var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    //Ejecutamos la funcion en el horario establecido
    var mailsUsers = ['sobreruedas.dova@gmail.com', 'sobre.ruedas.autoescuela@gmail.com'];
    mailsUsers.forEach( function(entry) {
        console.log(entry);

    });
    schedule.scheduleJob('15 21 * * 0,1,2,3,4', function(){
                // fecha inicial
        var start = new Date();
        start.setHours(0,0,0,0);
        start.setDate(start.getDate() + 1 );

        // fecha final
        var end = new Date();
        end.setHours(23,59,59,999);
        end.setDate(end.getDate() + 1 );
        console.log(start + " start -- end " + end);
        // buscamos en un intervalo de horas, que es el día de hoy
        practicas.find( {startTime : {$gte: start, $lt: end}}, {userId:1, startTime:1, _id:0},function(err, Todos) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            var arrayMails = [];
            Todos.forEach( function(entry) {
                arrayMails.push(entry.userId);

            });
            console.log(arrayMails);
            usuarios.find({_id : { $all: arrayMails}},{email:1}, function(err, emails){
                console.log(emails[0]);
            })
            
      /*      res.json(Todos);*/
        });
/*        nodemailerMailgun.sendMail({
            from: 'noreply@sobreruedas.com',
            to: ['sobreruedas.dova@gmail.com', 'sobre.ruedas.autoescuela@gmail.com'], // An array if you have multiple recipients.
            subject: 'Mañana tienes una práctica!!!!',
            text: 'Buenas noches: Mañana tienes una práctica. Que vaya bien y haz caso al profesor, que él sabe más. ;)',
        }, function (err, info) {
            if (err) {
            console.log('Error: ' + err);
            } else {
            console.log('Response: ' + info);
            }
        });*/
    });

/*    //Busca las prácticas de hoy para mostrárselas al profesor
    app.get('/mailRecordatorio', function(req, res) {
        // fecha inicial
        var start = new Date();
        start.setHours(0,0,0,0);
        start.setDate(start.getDay() +1 );
        // fecha final
        var end = new Date();
        end.setHours(23,59,59,999);
        end.setDate(end.getDay() +1 );
        console.log(start + " start -- end " + end);
        // buscamos en un intervalo de horas, que es el día de hoy
        practicas.find( {startTime : {$gte: start, $lt: end}}, function(err, Todos) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(Todos);
        });
    });*/

    // el usuario envía un mail a el administrador
    app.post('/mailContacto' , function(req, res) {
        nodemailerMailgun.sendMail({
            from: 'noreply@sobreruedas.com',
            to: ['sobreruedas.dova@gmail.com', 'sobre.ruedas.autoescuela@gmail.com'], // An array if you have multiple recipients.
            subject: 'Mail de contacto de ' + req.body.nombre,
            text: ' El sr/sra ' + req.body.nombre + ' quiere ponerse en contacto con nosotros vía ' + req.body.modo + ' y quiere información sobre ' + req.body.info + ' . Su email es ' + req.body.email + ' y su teléfono ' + req.body.tel ,
        }, function (err, info) {
            if (err) {
                console.log('Error: ' + err);
            }
            else {
                console.log('Response: ' + info);
            }
        });
        // fecha inicial
        res.redirect('/');
    });




    // se envía el formulario de registro
    app.post('/registrar', passport.authenticate('local-signup', {
        successRedirect : '/bienvenido', // si va bien se redirecciona hacia bienvenido
        failureRedirect : '/registro', // si hay algún error vuelve al formulario de registro
        failureFlash : true // permiso para los mensajes flash
    }));

    //login a través de passport
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/bienvenido', // si va bien se redirecciona hacia bienvenido
        failureRedirect : '/', // si hay algún error vuelve ala página de inicio
        failureFlash : true // permiso para los mensajes flash
    }));

    //muestra la pantalla inicial
    app.get('/', function(req, res) {
        res.render('index.ejs',
            // ponemos una variable para que cambie el renderizado según el usuario
            {botonRegistro: 'partials/publico/botonRegistro'}); 
    });

    //muestra la pantalla test
    app.get('/test', isLoggedIn, function(req, res) {
        var role = req.user.role;
        res.render('teorica.ejs',
            // ponemos una variable para que cambie el renderizado según el usuario
            {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre, testUser: 'partials/' + role + '/testUser.ejs'});
    });

    //muestra la pantalla de las prácticas
    app.get('/calendar',  isLoggedIn, function(req, res) {
        var role = req.user.role;
        res.render('practicas.ejs',
            // ponemos una variable para que cambie el renderizado según el usuario
            {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre, calendarUser: 'partials/' + role + '/calendar.ejs'});
    });

    //muestra la pantalla del perfil
    app.get('/perfil',  isLoggedIn, function(req, res) {
        var role = req.user.role;
        res.render('profile.ejs',
            // ponemos una variable para que cambie el renderizado según el usuario
            {botonRegistro: 'partials/'+ role + '/botonUser', nombre: ""});
    });

    //muestra la pantalla del tests
    app.get('/teorica', function(req, res) { 
        // ponemos una variable para que cambie el renderizado según el usuario
        res.render('teoricaPublic.ejs',  { botonRegistro: 'partials/publico/botonRegistro'});
    });

    //muestra la pantalla de práctica pública
    app.get('/practica', function(req, res) {
        // ponemos una variable para que cambie el renderizado según el usuario
        res.render('practicaPublic.ejs',  { botonRegistro: 'partials/publico/botonRegistro'});
    });

    //muestra la pantalla de registro
    app.get('/registro', function(req, res) {
        // ponemos una variable para que cambie el renderizado según el usuario
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/botonRegistro'});
    });

    //muestra la pantalla de registro con una opción seleccionada
    app.get('/registro:num', function(req, res) {
        // ponemos una variable para que cambie el renderizado según el usuario
        res.render('registro.ejs',  { botonRegistro: 'partials/publico/botonRegistro'});
    });

    //muestra la pantalla del inicio después del login
    app.get('/bienvenido', isLoggedIn , function(req, res) {
        var role = req.user.role;
        res.render('bienvenido.ejs',
            // ponemos una variable para que cambie el renderizado según el usuario
            {landing: 'partials/'+ role + '/entrada.ejs' , botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});

    });
    
    //muestra la pantalla de contacto
    app.get('/contacto', function(req, res) {
        var role = "publico";
        var nombre = "publico";
        if(req.user != undefined){
            role = req.user.role;
            nombre = req.user.nombre;
        }
        
        console.log(role);
        res.render('contacto.ejs',
         {botonRegistro: 'partials/'+ role + '/botonUser', nombre: nombre});

    });

    //muestra la pantalla de búsqueda de alumnos
    app.get('/alumnos', esAdmin , function(req, res) {
        var role = req.user.role;
        res.render('alumnos.ejs',
            // ponemos una variable para que cambie el renderizado según el usuario
            {botonRegistro: 'partials/'+ role + '/botonUser', nombre: req.user.nombre});
    });


    //recoge los datos del test de la base de datos
    app.get('/tests', isLoggedIn , function(req, res) {
        tests.find({},function(err, todos) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

    //Busca las prácticas de hoy para mostrárselas al profesor
    app.get('/buscarPracticas' , function(req, res) {
        // fecha inicial
        var start = new Date();
        start.setHours(0,0,0,0);
        // fecha final
        var end = new Date();
        end.setHours(23,59,59,999);
        // buscamos en un intervalo de horas, que es el día de hoy
        practicas.find( {startTime : {$gte: start, $lt: end}}, function(err, Todos) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(Todos);
        });
    });





    // busca todas las prácticas para mostrarlas en el calendario
    app.get('/practis', isLoggedIn , function(req, res) {
        practicas.find( function(err, Todos) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(Todos);
        });
    });

    // busca los pagos de un usuario específico
    app.post('/pagos', isLoggedIn , function(req, res) {
        // la busqueda puede ser el usuario que pasamos nosotros o, si no está definido, el propio de la sesión
        pagos.find({'userId': req.body._id || req.user._id}, function(err, practis) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(practis);
        });
    });

    // Añade exámenes teóricos y prácticos al usuario seleccionado por el admin
    app.post('/examenes', isLoggedIn , function(req, res) {
        // recogemos los valores 
        var cosas = req.body;
        // asignamos el valor del usuario a una variable
        var useId = cosas.user;
        // eliminanos el campo del usuario para poder insertar el objeto directamente a mongo
        delete cosas.user;

        // si el campo tipo es verdadero, el examen es teórico
        if(req.body.tipo){
            // eliminamos el campo tipo para usar el objeto directamente
            delete cosas.tipo;
            // actualizamos un array que tiene el objeto pagos añadiendo un objeto
            pagos.update({'userId': useId}, {$push :  {  examenTeorico : cosas }}, function(err) {
                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                console.log('salio bien practico');
                res.end();
            });
        // si el campo tipo es falso, el examen es práctico
    } else {
        delete cosas.tipo;
             // actualizamos un array que tiene el objeto pagos añadiendo un objeto
             pagos.update({'userId': useId}, {$push :  { examenPractico : cosas }}, function(err) {
                // si hay un error se envía. no se ejecutará nada después de res.send(err)
                if (err)
                    res.send(err)
                console.log('salio bien teorico');
                res.end();
            });
         }
     });

    //buscamos los datos del usuario actual
    app.get('/pagos', isLoggedIn , function(req, res) {
        pagos.find({'userId': req.user._id}, function(err, practis) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(practis);
        });
    });

    // recogemos datos del usuario 
    app.get('/datosUser',  isLoggedIn, function(req, res) {
        // buscamos los datos del usuario que utilizaremos, no todos
        usuarios.find({'_id': req.user._id},{email: 1, nombre: 1, apellidos: 1, tel: 1, fechNacimiento: 1, dni: 1, direccion: 1, 'examen.teoricoAprobado' : 1} ,function(err, usuario) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(usuario);
        });
    });

    //modificamos los datos del usuario seleccionado
    app.post('/editaDatosUser', function(req, res){
        // en esta variable recogemos el usuario que hemos pasado, o en su defecto, el usuario actual
        var idUs = req.body.user || req.user._id;
        // elimimanos el campo user para poder usar el objeto directamente en mongo
        delete req.body.user;
        // se utiliza $set para modificar el campo seleccionado y no eliminar el resto
        usuarios.update({'_id': idUs}, { $set : req.body }, function(err) {
            if (err){
                res.send(err)
                console.log('MAL updateado');
            } else{
                console.log("updateado");
                res.redirect('/perfil');
            }

        });
    });

    //  actualizamos los datos del examen teórico
    app.post('/fallos', function(req, res){
        var idEx = req.body.exId;
        // para poder actualizar un array en mongo, hay que poner un '$' entre el nombre del objeto y los campos que hay dentro del objeto, dentro del array de objetos
        pagos.update({'userId': req.body.user, 'examenTeorico._id': idEx}, { $set :{'examenTeorico.$.fallos': req.body.fallos}  }, function(err) {
            if (err){
                console.log('MAL updateado');
                res.send(err + "Estamos en los fallos");
            } else{
                console.log("updateado");
                res.end();
            }

        });
    });

    // el usuario paga los exámenes pendientes
    app.post('/pagar', function(req, res){
        var idEx = req.body.exId;
        // para poder actualizar un array en mongo, hay que poner un '$' entre el nombre del objeto y los campos que hay dentro del objeto, dentro del array de objetos
        pagos.update({'userId': req.body.user, 'examenPractico._id': idEx}, { $set :{'examenPractico.$.examenPagado': true }  }, function(err) {
            if (err){

                console.log('MAL pagado');
                res.send(err + "Estamos en los pagos");
            } else{
                console.log("pagado");
                res.end();
            }

        });
    });

    // mostramos el último test realizado por el usuario
    app.get('/testsDelUser',  esAlumno, function(req, res) {
        userTest.find({'userId': req.user._id} ,function(err, tests) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(tests);
        });
    });

    // el administrador busca usuarios por nombre
    app.post('/buscar', esAdmin , function(req, res) {
        var nombre = req.body.nombre;
        if (nombre == undefined || nombre == ''){
            nombre = 4;
        }
        // buscamos los usuarios mediante una expresión regular
        usuarios.find({$or: [ {'nombre': {$regex:nombre, $options : 'i' }}, {'dni': req.body.dni} ] }, function(err, practis) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            res.json(practis);

        });
    });


    // comprar prácticas
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


    // guarda el test realizado por el usuario
    app.post('/guardarTest', function(req, res){
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

    //guarda el horario de las prácticas
    app.post('/guardar', function(req, res){
        pagos.find({'userId': req.user._id}, function(err, practis) {
            // si hay un error se envía. no se ejecutará nada después de res.send(err)
            if (err)
                res.send(err)
            if( req.user.role  == "profesor" || req.user.role  == "admin" || practis[0].numPracticasTotalPagadas > practis[0].practicas.length ){
                // variable de fin de prácticas que utilizamos en el calendario
                var endtime = new Date(req.body.time); 
                // se suman 45 minutos al inicio de la práctica
                endtime.setMinutes(endtime.getMinutes() + 45);
                var practica = new practicas({'userId': req.user._id, 'startTime' : req.body.time, 'endTime' : endtime, 'title' : req.user.nombre});
                // se guarda la práctica
                practica.save(function(err) {
                    // se actualiza en los datos de pago que se ha realizado una práctica más
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

    //borra prácticas del usuario
    app.post('/borrar', function(req, res){
        // se borra la práctica por su id
        practicas.remove({'userId': req.user._id, '_id': req.body.practId }, function(err) {
            if (err){
                res.send(err)
                console.log('MAL borrado');
            } else{
                // se actualiza el objeto de pagos del usuario y se quita la práctica
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

    //logout del usuario a través del módulo passport y elimimando la sesión actual
    app.get('/logout',function(req,res){
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });

    });

    //si la ruta no existe muestra el error
    app.get('*',notExists);


};

// middleware para asegurarnos que el usuario está logueado
function esAlumno(req, res, next) {
    // si el usuario está autenticado continuamos 
    if (req.isAuthenticated() && req.user.role == "alumno"){
        return next();
    }
    // si no lo está, se redirecciona al inicio
    res.redirect('/');
}

function esProfe(req, res, next) {
    // si el usuario está autenticado continuamos 
    if (req.isAuthenticated() && req.user.role == "profesor"){
        return next();
    }
    // si no lo está, se redirecciona al inicio
    res.redirect('/');
}

function esAdmin(req, res, next) {
    // si el usuario está autenticado continuamos 
    if (req.isAuthenticated() && req.user.role == "admin"){
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

// esta función nos muestra un mensaje cuando llegamos a una ruta no especificada por nosotros
function notExists(req, res, next) {
    res.status(404).send('NO VAYAS POR AHI!');
}
