// LAYER 3: SERVICE (business layer) - USERS

const {getUserDB, createUserDB} = require("../../4-DAOs/mongoDB/dao/user");
const moment = require("moment");
const {mailRegister} = require("../mailing/sender");


const getUserService = async (username, password) =>{

    if(!username || !password){
        let returnData = {
            badRequest: "Missing data"
        }

        return {badRequest: returnData};
    }

    let data = await getUserDB(username);

    if(data && data.username){

        if(data.validated == false){
            let returnData = {
                userNotValidated: "userNotValidated"
            }
    
            return {notValidated: returnData};
        }

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

const createUserService = async (userObject) =>{

    if(!userObject.username, !userObject.favoriteteam, !userObject.lastname, !userObject.name, !userObject.tac){

        return {badRequest: "Missing data"};

    }

    try {

        userObject.createddate = await moment(new Date()).format("DD/MM/YYYY");
        userObject.admin = false;
        userObject.validated = false;
        userObject.password = await (Math.random() + 1).toString(36).substring(0);
       
        // STEP ONE: try to find it
        let data = await getUserDB(userObject.username);
        if(data && data.username){

            return {userExists: "User already registerd"};

        }else{

            let data = await createUserDB(userObject);

            if(data && data.username){

                let url = `https://superligafifa.herokuapp.com/register?id=${data._id}`;

                await mailRegister(data.username, data.name, url);

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
                return {error: data};
            }

        }

    } catch (error) {

        return {error: error};

    }

}

const createUserConfirmationService = async (userObject) =>{
    return "data";
}

module.exports = {
    getUserService,
    createUserService,
    createUserConfirmationService
}
