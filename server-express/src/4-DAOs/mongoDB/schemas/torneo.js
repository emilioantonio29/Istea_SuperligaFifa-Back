const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;
const { fechaSchema } = require("./fecha");

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

// PASO 2

const torneoSchema = new SchemaLocal({
    fechas: {type: [fechaSchema]},
    name: {type: String},
    owner: {type: String},

});

const torneoMongoaaS = mongoose.model('torneos', torneoSchema)

//////////////////////////////////////////////////////////////////////////////////////////////////////

// PASO 1

const torneoRegisterSchema = new SchemaLocal({
    cantidadjugadores: {type: Number},
    torneoid: {type: String},
    owner: {type: String},
    jugadores: {type: Array},
    liga: {type: String},
    cerrado: {type: Boolean},
    nombre: {type: String}
});

const torneoRegisterMongoaaS = mongoose.model('torneoregisters', torneoRegisterSchema)

module.exports = {
    torneoMongoaaS,
    torneoRegisterMongoaaS
}