// Fichero test.js
var mongoose = require('mongoose');
// Creamos el objeto
var schema = mongoose.Schema;
// Creamos una instancia del objeto
var schemaTest = new schema ({
    idTema: Number,
    pregunta: String,
    respuestas:{
        respuesta: [String],
        solucion: Number
    },
    imagen: String
});
// Registramos el schemaTest en esta estructura
// Exportamos el modelo que se corresponde con la colección(tabla) 'test'
module.exports = mongoose.model('test', schemaTest, 'test');
