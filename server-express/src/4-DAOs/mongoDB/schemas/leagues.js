const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

const ligasSchema = new SchemaLocal({
    league: {type: String},
    teams: {type: Array}
});

const ligasMongoaaS = mongoose.model('ligas', ligasSchema)

module.exports = {
    ligasMongoaaS
}