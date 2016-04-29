//Fichero usuarios.js
var mongoose = require('mongoose');

var bcrypt   = require('bcrypt-nodejs');
//Creamos el objeto
var schema = mongoose.Schema;
//Creamos una instancia del objeto
var schemaUser = new schema ({
    expediente: Number,
    dni: String,
    nombre: String,
    apellidos: String,
    direccion:{
        calle: String,
        num: Number,
        piso: Number,
        cp: Number,
        provincia: String,
        pais: String,
    },
    fechNacimiento: Date,
    test:{
        idTema: Number,
        fechTest: Date,
        errores: Number
    },
    examen:{
        fechTeorico: [Date],
        fechPractico: [Date],
        documentos:{
            foto: {
                cant: Number,
                entregado: Boolean
            },
            copiaDni: Boolean,
            certMedico: Boolean
        }
    },
    contabilidad:{
        tipoContrato: String,
        fechEntrada: {type: Date, default: Date.now},
        fechFin: Date,
        fechCancel: Date
    },
    pack : String,
    acceptTerms: {type: String, default: 'on'},
    tel: Number,
    email: String,
    pwd: String,
    role: {type: String, default: 'alumno'}
});

// methods ======================
// generating a hash
schemaUser.methods.generateHash = function(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schemaUser.methods.validPassword = function(pwd) {
    return bcrypt.compareSync(pwd, this.pwd);
};
//Registramos el schemaUser en esta estructura
//Exportamos el modelo que se corresponde con la colección(tabla) 'Usuarios'
module.exports = mongoose.model('usuarios', schemaUser);
