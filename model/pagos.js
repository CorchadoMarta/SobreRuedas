// Fichero pagos.js
var mongoose = require('mongoose');
// Creamos el objeto
var schema = mongoose.Schema;
// Creamos una instancia del objeto
var schemaPagos = new schema ({
    userId: schema.ObjectId,
    matricula: {
        fechMatricula: {type: Date, default: Date.now},
        impMatri: Number,
        matriculaPagada: Boolean
    },
    numPracticasTotalPagadas: Number,
    practicasPagadas: Number,
    packDePracticas: Number,
    importePracticas: { type: Number, default: 27.80},
    importePackPractis: { type: Number, default: 260},
    practicas: [ schema.ObjectId ],
    tasas: [{
        expediente: {
            fechExpd: Date,
            impExpediente: { type: Number, default: 89},
            expPagado: Boolean 
        },
        renovación: {
            fechReno: Date,
            impReno: { type: Number, default: 189},
            renoPagada: Boolean
        },
        cambio: {
            fechCambio: Date,
            impCambio: Number,
            cambioPagada: Boolean
        },
    }],
    examenPractico:[{
        fechEx: Date,
        fechExPago: Date,
        impExamen: { type: Number, default: 59},
        examenPagado: Boolean
    }],
    examenTeorico:[{
        fallos: Number,
        fechEx: Date,
    }],
    matDidactico: {
        impMaterial: Number,
        materialPagado: Boolean
    },
    pagoMensual: Boolean,
    pagosMensuales : [ Date ],
    importePagoMensual: Number

});
// Registramos el schemaPagos en esta estructura
// Exportamos el modelo que se corresponde con la colección(tabla) 'pagos'
module.exports = mongoose.model('pagos', schemaPagos); 