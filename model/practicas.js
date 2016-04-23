//Fichero usuarios.js
var mongoose = require('mongoose');
//Creamos el objeto
var schema = mongoose.Schema;
//Creamos una instancia del objeto
var schemaPracticas = new schema ({
    fechPagoPract: Date,
    fechPractica: Date,
    impPractica: Number
});
//Registramos el schemaUser en esta estructura
//Exportamos el modelo que se corresponde con la colección(tabla) 'Usuarios'
module.exports = mongoose.model('practicas', schemaPracticas); 