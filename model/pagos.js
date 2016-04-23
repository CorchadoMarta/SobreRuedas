//Fichero usuarios.js
var mongoose = require('mongoose');
//Creamos el objeto
var schema = mongoose.Schema;
//Creamos una instancia del objeto
var schemaPagos = new schema ({
    userId: schema.ObjectId,
    matricula: {
        fechMatricula: {type: Date, default: Date.now},
        impMatri: Number,
        matriculaPagada: Boolean
    },
    numPracticas: Number,
    impPractica: Number,
    practicas: [{idPractis: schema.ObjectId}],
    tasas: {
        expediente: {
            fechExpd: Date,
            impExpediente: Number,
            expPagado: Boolean 
        },
        renovación: {
            fechReno: Date,
            impReno: Number,
            renoPagada: Boolean
        },
        cambio: {
            fechCambio: Date,
            impCambio: Number,
            cambioPagada: Boolean
        }

    },
    examenPractico:{
        fechEx: Date,
        fechExPago: Date,
        impExamen: Number,
        examenPagado: Boolean
    },
    matDidactico: {
        impMaterial: Number,
        materialPAgado: Boolean
    }

});
//Registramos el schemaUser en esta estructura
//Exportamos el modelo que se corresponde con la colección(tabla) 'Usuarios'
module.exports = mongoose.model('pagos', schemaPagos); 