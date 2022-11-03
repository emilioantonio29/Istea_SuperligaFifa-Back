const mongoose = require('mongoose');
const SchemaLocal = mongoose.Schema;

/*  
    What is a schema? 
    What is a model?

    https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
*/ 

const userSchema = new SchemaLocal({
    username: {type: String},
    password: {type: String},
    admin: {type: Boolean}, 
    favoriteteam: {type: String}, 
    lastname: {type: String},
    name: {type: String},
    createddate: {type: String}, 
    tac: {type: Boolean},
    validated: {type: Boolean},
    passwordrecoverytoken: {type: String},
    passwordrecoverycreateddate: {type: Date},
    passwordrecoveryused: {type: Boolean}
});

const userMongoaaS = mongoose.model('users', userSchema)

module.exports = {
    userMongoaaS
}