// LAYER 3: SERVICE (business layer) - USERS

const {getUserDB} = require("../../4-DAOs/mongoDB/dao/user")

const getUserService = async (username, password) =>{

    if(!username || !password){
        let returnData = {
            badRequest: "Missing data"
        }

        return {badRequest: returnData};
    }

    let data = await getUserDB(username);

    if(data && data.username){

        if(data.password == password){
            let returnData = {
                _id: data._id,
                username: data.username,
                admin: data.admin,
                favoriteteam: data.favoriteteam,
                lastname: data.lastname,
                name: data.name,
                createddate: data.createddate,
                tac: data.tac
              }
    
            return {user: returnData};
        }else{

            let returnData = {
                userNotfound: "userNotfound"
            }
    
            return {notFound: returnData};
            
        }


    }else if(data === null){

        let returnData = {
            userNotfound: data
        }

        return {notFound: returnData};

    }else{

        return data

    }
}

module.exports = {
    getUserService
}
