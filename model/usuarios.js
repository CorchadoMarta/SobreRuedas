//Fichero usuarios.js
var mongoose = require('mongoose');
//Creamos el objeto
var schema = mongoose.Schema;
//Creamos una instancia del objeto
var schemaUser = new schema ({
	expediente: Number,
	dni: String,
	nombre: String,
	apellido1: String,
	apellido2: String,
	dirección: [new schema({
		calle: String,
		num: Number,
		piso: Number,
		cp: Number,
		provincia: String,
		pais: String,	
		})],
	fechNacimiento: Date,
	test:[new schema({
		idTema: Number,
		fechTest: Date,
		errores: Number
		})],
	examen: [new schema({
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
	})],
	contabilidad:[new schema({
		fechEntrada: Date,
		fechFin: Date,
		fechCancel: Date
	})],
	tel: Number,
	email: String,
	pwd: String,
});
//Registramos el schemaUser en esta estructura
//Exportamos el modelo que se corresponde con la colección(tabla) 'Usuarios'
module.exports = mongoose.model('usuarios', schemaUser); 