const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;
const { partidoSchema } = require("./partido");

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

const fechaSchema = new SchemaLocal({
    partidos: {type: [partidoSchema]},
    titulo: {type: String}
});

const fechaMongoaaS = mongoose.model('fechas', fechaSchema)

module.exports = {
    fechaMongoaaS,
    fechaSchema
}