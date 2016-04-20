//Fichero reserves.js
var mongoose = require('mongoose');
mongoose.set('debug', true);
//Creamos el objeto
var schema = mongoose.Schema;
//Creamos una instancia del objeto
var schemaTest = new schema ({
	idTema: Number,
	pregunta: String,
	respuestas:{
		respuesta: [String],
		solucion: Number
	},
	imagen: String
});
//Registramos el schemaUser en esta estructura
//Exportamos el modelo que se corresponde con la colección(tabla) 'Usuarios'
module.exports = mongoose.model('test', schemaTest, 'test'); 