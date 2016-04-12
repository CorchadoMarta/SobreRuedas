//Fichero usuarios.js
var mongoose = require('mongoose');
//Creamos el objeto
var schema = mongoose.Schema;
//Creamos una instancia del objeto
var schemaProfe = new schema ({
	dni: String,
	nombre: String,
	apellido1: String,
	apellido2: String,
	dirección:{
		calle: String,
		numero: Number,
		cp: Number,
		provincia: String,
		pais: String,	
		},
	fechNacimiento: Date,
	contabilidad:{
		tipoContrato: String,
		fechEntrada: Date,
		fechFin: Date,
		fechCancel: Date
		},
	telefono: Number,
	email: String,
	pass: String,
});
//Registramos el schemaUser en esta estructura
//Exportamos el modelo que se corresponde con la colección(tabla) 'Usuarios'
module.exports = mongoose.model('profe', schemaProfe); 