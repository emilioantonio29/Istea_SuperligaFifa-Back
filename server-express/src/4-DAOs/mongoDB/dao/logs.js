const {mailMongoaaS} = require("../schemas/mail");
const mongoConnectionNoSingleton = require("../connection/mongoconnection");

/*
    CRUD OPERATIONS: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/
*/

const mailingLog = async (mailObj) =>{
    
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let mail = mailMongoaaS.create(mailObj);
        return mail
    })
    .catch(err=>{
        console.log(err)
        return {error: err}
    })
    .finally(() => {
        mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data
    
}

module.exports= {
    mailingLog
}