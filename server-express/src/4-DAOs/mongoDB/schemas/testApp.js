const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

const userSchema = new SchemaLocal({
    obj: {type: Object}
});

const testMongoaaS = mongoose.model('testapp', userSchema)

module.exports = {
    testMongoaaS
}