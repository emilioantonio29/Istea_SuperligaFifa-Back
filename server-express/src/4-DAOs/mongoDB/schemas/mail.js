const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

const mailSchema = new SchemaLocal({
    username: {type: String},
    createddate: {type: String}, 
    type: {type: String}, 
    body: {type: String},
    subject: {type: String},
    sended: {type: Boolean}
});

const mailMongoaaS = mongoose.model('mails', mailSchema)

module.exports = {
    mailMongoaaS
}