// Fichero userTest.js
var mongoose = require('mongoose');
// Creamos el objeto
var schema = mongoose.Schema;
// Creamos una instancia del objeto
var schemaUserTest = new schema ({
    userId: schema.ObjectId,
    idTema: Number,
    fallos: Number,
    fecha: {type: Date, default: Date.now}
});
// Registramos el schemaPracticas en esta estructura
// Exportamos el modelo que se corresponde con la colección(tabla) 'userTests'
module.exports = mongoose.model('userTests', schemaUserTest);
