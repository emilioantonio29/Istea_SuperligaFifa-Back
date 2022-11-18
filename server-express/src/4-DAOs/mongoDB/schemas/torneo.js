const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;
const { fechaSchema } = require("./fecha");

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

const torneoSchema = new SchemaLocal({
    fechas: {type: [fechaSchema]},
    name: {type: String},
    owner: {type: String},

});

const torneoMongoaaS = mongoose.model('torneos', torneoSchema)

module.exports = {
    torneoMongoaaS
}