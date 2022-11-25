const {torneoMongoaaS, torneoRegisterMongoaaS} = require("../schemas/torneo");
const mongoConnectionNoSingleton = require("../connection/mongoconnection");

/*
    CRUD OPERATIONS: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/
*/


const createTorneoDB = async (torneoObject) =>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let torneo = torneoMongoaaS.create(torneoObject);
        return torneo
    })
    .catch(err=>{
        console.log(err)
        return {error: err}
    })
    .finally(() => {
        mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data;
    
}

const createTorneoStep1DB = async (torneoObject)=>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let torneoStep1 = torneoRegisterMongoaaS.create(torneoObject);
        return torneoStep1
    })
    .catch(err=>{
        console.log(err)
        return {error: err}
    })
    .finally(() => {
        mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
    })

    return data;

}

const getTorneoDB = async (username) =>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let tournaments = torneoRegisterMongoaaS.find(username); 
        return tournaments
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

const getTorneoJugadorDB = async (username) =>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let tournaments = torneoRegisterMongoaaS.find({ jugadores: username }); 
        return tournaments
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

const updateTorneoJugadorDB = async (id, username) =>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let tournaments = torneoRegisterMongoaaS.updateOne(
            { _id: id },
            { $push: {jugadores: username} }); 
        return tournaments
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

const updateTorneoDB = async (id, object) =>{
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let tournaments = torneoRegisterMongoaaS.updateOne(                
            { _id: id },
            { $set: object }
        ); 
        return tournaments
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
    createTorneoDB,
    createTorneoStep1DB,
    getTorneoDB,
    getTorneoJugadorDB,
    updateTorneoJugadorDB,
    updateTorneoDB
}