// Fichero practicas.js
var mongoose = require('mongoose');
// Creamos el objeto
var schema = mongoose.Schema;
// Creamos una instancia del objeto
var schemaPracticas = new schema ({
    userId: schema.ObjectId,
    fechPagoPract: Date,
    fechPractica: Date,
    impPractica: Number,
    title: String,
    startTime: Date,
    endTime: Date,
    allDay: {type: Boolean, default: false}
});
// Registramos el schemaPracticas en esta estructura
// Exportamos el modelo que se corresponde con la colección(tabla) 'practicas'
module.exports = mongoose.model('practicas', schemaPracticas);
