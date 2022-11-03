const {userMongoaaS} = require("../schemas/user");
const mongoConnectionNoSingleton = require("../connection/mongoconnection");

/*
    CRUD OPERATIONS: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/
*/

const getUserDB = async (object) =>{

    // let data = await mongoConnectionNoSingleton.mongoConnection()
    // let user = await userMongoaaS.findOne({username: username});
    // console.log(user)
    
    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let user = userMongoaaS.findOne(object); 
        return user
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

const createUserDB = async (userObject) =>{

    let data = await mongoConnectionNoSingleton.mongoConnection()
    .then(() => {
        let user = userMongoaaS.create(userObject);
        return user
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

const userConfirmationDB = async (id, password) =>{

    let data = await mongoConnectionNoSingleton.mongoConnection()
        .then(()=>{
            let user = userMongoaaS.updateOne(
                { _id: id },
                { $set: { validated: true, password: password } },
            )

            return user;
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

const userUpdatenDB = async (filterObject, updateObject) =>{

    let data = await mongoConnectionNoSingleton.mongoConnection()
        .then(()=>{
            let user = userMongoaaS.findOneAndUpdate(
                filterObject,
                { $set: updateObject },
            )

            return user;
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

module.exports= {
    getUserDB,
    createUserDB,
    userConfirmationDB,
    userUpdatenDB
}