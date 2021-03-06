// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../model/usuarios');
var Pago            = require('../model/pagos');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // re./quired for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, {_id: user.id, nombre: user.nombre, privi: user.user});
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'pwd',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
                                                   function(req, email, pwd, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user

                    // set the user's local credentials
                    var contenido = req.body;
                    var usuario = new User(contenido);
                    usuario.direccion = contenido;
                    usuario.markModified('direccion');
                    usuario.pwd = usuario.generateHash(pwd);
                    usuario.markModified('pwd');
                    console.log(contenido);

                    // save the user
                    usuario.save(function(err) {
                        switch(req.body.pack) {
                            case 'basic':
                                pagoUser = new Pago({userId:usuario.id , numPracticasTotalPagadas: 0, pagoMensual: false });
                                pagoUser.matricula.impMatri = 125;
                                pagoUser.markModified('matricula.impMatri');
                                pagoUser.matricula.matriculaPagada = true;
                                pagoUser.markModified('matricula.matriculaPagada');
                                pagoUser.save();
                                if (err)
                                    throw err;

                                return done(null, usuario);

                                break;
                            case 'standard':
                                pagoUser = new Pago({userId:usuario.id , numPracticasTotalPagadas: 15, pagoMensual: true, importePagoMensual: 85 });
                                pagoUser.matricula.impMatri = 85;
                                pagoUser.markModified('matricula.impMatri');
                                pagoUser.matricula.matriculaPagada = true;
                                pagoUser.markModified('matricula.matriculaPagada');
                                pagoUser.save();
                                if (err)
                                    throw err;

                                return done(null, usuario);

                                break;
                            case 'unique':
                                pagoUser = new Pago({userId:usuario.id , numPracticasTotalPagadas: 0, pagoMensual: false });
                                pagoUser.matricula.impMatri = 189;
                                pagoUser.markModified('matricula.impMatri');
                                pagoUser.matricula.matriculaPagada = true;
                                pagoUser.markModified('matricula.matriculaPagada');
                                pagoUser.save();
                                if (err)
                                    throw err;

                                return done(null, usuario);

                                break;
                        };


                    });
                }

            });

        });

    }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'pwd',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
                                                  function(req, email, pwd, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                console.log('mal user');
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(pwd)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                console.log('mal password');
            }

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
