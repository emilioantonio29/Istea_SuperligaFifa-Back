// LAYER 3: SERVICE (business layer) - USERS

const {getUserDB, createUserDB, userConfirmationDB, userUpdatenDB} = require("../../4-DAOs/mongoDB/dao/user");
const moment = require("moment");
const {mailRegister, mailRegisterConfirmation, mailPasswordRecovery} = require("../mailing/sender");
const {bcryptHash, bcryptCompare} = require("../bcrypt/bcrypt");


const getUserService = async (username, password) =>{

    if(!username || !password){
        let returnData = {
            badRequest: "Missing data"
        }

        return {badRequest: returnData};
    }

    let data = await getUserDB({username: username});

    if(data && data.username){

        if(data.validated == false){
            let returnData = {
                userNotValidated: "userNotValidated"
            }
    
            return {notValidated: returnData};
        }

        let match = await bcryptCompare(password, data.password);

        if(match){
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

    if(!userObject.username || !userObject.favoriteteam || !userObject.lastname || !userObject.name || !userObject.tac){

        return {badRequest: "Missing data"};

    }

    try {

        userObject.createddate = await moment(new Date()).format("DD/MM/YYYY");
        userObject.admin = false;
        userObject.validated = false;
        userObject.password = await (Math.random() + 1).toString(36).substring(0);
        userObject.passwordrecoverytoken = "";
        userObject.passwordrecoverycreateddate = new Date().getTime();
        userObject.passwordrecoveryused = true;
       
        // STEP ONE: try to find it
        let data = await getUserDB({username: userObject.username});
        if(data && data.username){

            return {userExists: "User already registered"};

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

    if(!userObject.id || !userObject.password){

        return {badRequest: "Missing data"};
    }

    let user = await getUserDB({_id: userObject.id});

    if(user && user.validated){
        return {badRequest: "user already confirmed"};
    }

    let hashPassword = await bcryptHash(userObject.password);

    let data = await userConfirmationDB(userObject.id, hashPassword);

    if(data && data.modifiedCount > 0){

        let url = `https://superligafifa.herokuapp.com`;

        await mailRegisterConfirmation(user.username, user.name, url)
        
        return {confirmationCompleted: "success"};

    }else if(data && data.modifiedCount == 0){

        return {confirmationNotCompleted: "user not found"};

    }else{

        return {error: data}

    }

}

const passwordRecoveryService = async (username) =>{

    if(!username){

        return {badRequest: "Missing data"};
    }

    try {
        
        let filterObject = {username: username};
        let updateObject = {
            passwordrecoverytoken: Math.random().toString(36),
            passwordrecoverycreateddate: new Date().getTime()+5*60000,
            passwordrecoveryused: false

        };

        let data = await userUpdatenDB(filterObject, updateObject);

        if(data && data.username){

            let url = `https://superligafifa.herokuapp.com/passwordrecovery?id=${data._id}&token=${updateObject.passwordrecoverytoken}&user=${data.username}`;
    
            await mailPasswordRecovery(data.username, data.name, url)
            
            return {passwordRecoveryCompleted: "success"};
    
        }else if(data === null){
    
            return {confirmationNotCompleted: "user not found"};
    
        }else{
    
            return {error: data}
    
        }

    } catch (error) {

        return {error: error};
        
    }

}

module.exports = {
    getUserService,
    createUserService,
    createUserConfirmationService,
    passwordRecoveryService
}
