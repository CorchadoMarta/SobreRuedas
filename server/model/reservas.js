//Fichero reserves.js
var mongoose = require('mongoose');
//Creamos el objeto
var schema = mongoose.Schema;
//Creamos una instancia del objeto
var schemaReserva = new schema ({
	userId: schema.ObjectId,
	profesorId:schema.ObjectId,
	fechInicio: Date,
	fechFinal: Date,
	Lugar: String
});
//Registramos el schemaUser en esta estructura
//Exportamos el modelo que se corresponde con la colección(tabla) 'Usuarios'
module.exports = mongoose.model('reservas', schemaReserva); 