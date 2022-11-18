const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

const partidoSchema = new SchemaLocal({
    local: {type: String},
    visitante: {type: String}, 
    ganador: {type: String}, 
});

const partidoMongoaaS = mongoose.model('partidos', partidoSchema)

module.exports = {
    partidoMongoaaS,
    partidoSchema
}