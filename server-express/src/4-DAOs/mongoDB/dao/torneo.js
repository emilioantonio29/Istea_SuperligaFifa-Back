const {torneoMongoaaS} = require("../schemas/torneo");
const mongoConnectionNoSingleton = require("../connection/mongoconnection");

/*
    CRUD OPERATIONS: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/
*/

// const getUserDB = async (object) =>{

//     // let data = await mongoConnectionNoSingleton.mongoConnection()
//     // let user = await userMongoaaS.findOne({username: username});
//     // console.log(user)
    
//     let data = await mongoConnectionNoSingleton.mongoConnection()
//     .then(() => {
//         let user = userMongoaaS.findOne(object); 
//         return user
//     })
//     .catch(err=>{
//         console.log(err)
//         return {error: err}
//     })
//     .finally(() => {
//         mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
//     })

//     return data
    
// }

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

// const userConfirmationDB = async (id, password) =>{

//     let data = await mongoConnectionNoSingleton.mongoConnection()
//         .then(()=>{
//             let user = userMongoaaS.updateOne(
//                 { _id: id },
//                 { $set: { validated: true, password: password } },
//             )

//             return user;
//         })
//         .catch(err=>{
//             console.log(err)
//             return {error: err}
//         })
//         .finally(() => {
//             mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
//         })

//     return data;

// }

// const userUpdateDB = async (filterObject, updateObject) =>{

//     let data = await mongoConnectionNoSingleton.mongoConnection()
//         .then(()=>{
//             let user = userMongoaaS.findOneAndUpdate(
//                 filterObject,
//                 { $set: updateObject },
//             )

//             return user;
//         })
//         .catch(err=>{
//             console.log(err)
//             return {error: err}
//         })
//         .finally(() => {
//             mongoConnectionNoSingleton.mongoDisconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
//         })

//     return data;

// }

module.exports= {
    // getUserDB,
    createTorneoDB,
    // userConfirmationDB,
    // userUpdateDB
}