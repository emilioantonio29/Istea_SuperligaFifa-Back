const {ligasMongoaaS} = require("../schemas/leagues");
const mongoConnectionNoSingleton = require("../connection/mongoconnection");

/*
    CRUD OPERATIONS: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/
*/

const getLeague = async (object) =>{
    
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let league = ligasMongoaaS.findOne(object); 
        return league
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
    getLeague
}