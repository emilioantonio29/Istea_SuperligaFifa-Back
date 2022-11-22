// LAYER 3: SERVICE (business layer) - USERS

const {getUserDB, createUserDB, userConfirmationDB, userUpdateDB} = require("../../4-DAOs/mongoDB/dao/user");
const moment = require("moment");
const {mailRegister, mailRegisterConfirmation, mailPasswordRecovery, mailPasswordRecoveryConfirmation} = require("../mailing/sender");
const {bcryptHash, bcryptCompare} = require("../bcrypt/bcrypt");
const Encrypter = require("../encryption/encrypter");

const validateUser = async (token) =>{
    try {

        const encrypter = new Encrypter(process.env.ENCRYPTIONKEY);
        const dencrypted = encrypter.dencrypt(token);
        const userObject = JSON.parse(dencrypted);

        if(userObject.user && userObject.expired > new Date().getTime()){
            
            let data = await getUserDB({username: userObject.user.username});

            if(data && data.username){
    
                if(data.validated == false){
                    let returnData = {
                        userNotValidated: "userNotValidated"
                    }
            
                    return {notValidated: returnData};
                }

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
                
                const encrypter = new Encrypter(process.env.ENCRYPTIONKEY);

                let encryptedSession = {
                    user: returnData,
                    expired: new Date().getTime()+60*60000
                }

                let encryptedData = await encrypter.encrypt(JSON.stringify(encryptedSession));

                return {user: {
                    user: returnData,
                    session: encryptedData
                }};

            }else{

                return {error: data};

            }

        }else{

            return {expired: "Your session has expired"}

        }
        
    } catch (error) {

        return {unauthorized: error}

    }
}

const getUserService = async (username, password) =>{

    if(!username || !password){
        let returnData = {
            badRequest: "Missing data"
        }

        return {badRequest: returnData};
    }

    try {

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
                
                const encrypter = new Encrypter(process.env.ENCRYPTIONKEY);

                let encryptedSession = {
                    user: returnData,
                    expired: new Date().getTime()+60*60000
                }

                let encryptedData = await encrypter.encrypt(JSON.stringify(encryptedSession));

                return {user: {
                    user: returnData,
                    session: encryptedData
                }};

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
    
            return {error: data};
    
        }
   
    } catch (error) {

        return {error: error};
        
    }

}

const getUserBySessionService = async(token) =>{

    if(!token){

        return {badRequest: "Missing data"};

    }

    try {

        const encrypter = new Encrypter(process.env.ENCRYPTIONKEY);
        const dencrypted = encrypter.dencrypt(token);
        const userObject = JSON.parse(dencrypted);

        if(userObject.user && userObject.expired > new Date().getTime()){
            
            let data = await getUserDB({username: userObject.user.username});

            if(data && data.username){
    
                if(data.validated == false){
                    let returnData = {
                        userNotValidated: "userNotValidated"
                    }
            
                    return {notValidated: returnData};
                }

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
                
                const encrypter = new Encrypter(process.env.ENCRYPTIONKEY);

                let encryptedSession = {
                    user: returnData,
                    expired: new Date().getTime()+60*60000
                }

                let encryptedData = await encrypter.encrypt(JSON.stringify(encryptedSession));

                return {user: {
                    user: returnData,
                    session: encryptedData
                }};

            }else{

                return {error: data};

            }


        }else{

            return {expired: "Your session has expired"}

        }
        
    } catch (error) {

        return {unauthorized: error}

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

                let url = `https://superligafifa.herokuapp.com/register?id=${data._id}&user=${data.username}`;

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

    if(!userObject.id || !userObject.password || !userObject.email){

        return {badRequest: "Missing data"};
    }

    try {

        let user = await getUserDB({_id: userObject.id});
    
        if(user && user.username !== userObject.email){
            return {badRequest: "id or user invalid"};
        }
    
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

    } catch (error) {
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
            passwordrecoverycreateddate: new Date().getTime()+10*60000,
            passwordrecoveryused: false

        };

        let data = await userUpdateDB(filterObject, updateObject);

        if(data && data.username){

            if(data.validated){
                
                let url = `https://superligafifa.herokuapp.com/passwordrecovery?token=${updateObject.passwordrecoverytoken}&user=${data.username}`;
        
                await mailPasswordRecovery(data.username, data.name, url)
                
                return {passwordRecoveryCompleted: "success"};

            }else{
                return {userNotValidated: "user not validated"};
            }

    
        }else if(data === null){
    
            return {confirmationNotCompleted: "user not found"};
    
        }else{
    
            return {error: data}
    
        }

    } catch (error) {

        return {error: error};
        
    }

}

const passwordRecoveryConfirmationService = async (userObject) =>{

    if(!userObject.username || !userObject.token || !userObject.password){

        return {badRequest: "Missing data"};
    }

    try {

        let date = new Date().getTime();

        let data = await getUserDB({username: userObject.username});

        if(data && data.username){

            if(data.validated == false){

                return {userNotValidated: "user not validated"};

            }else if(data.passwordrecoveryused == false && data.passwordrecoverycreateddate > date && userObject.token == data.passwordrecoverytoken){

                let hashPassword = await bcryptHash(userObject.password);

                let filterObject = {username: data.username};
                let updateObject = {
                    passwordrecoveryused: true,
                    password: hashPassword
                };

                let user = await userUpdateDB(filterObject, updateObject);

                console.log("data", user)

                if(user && user.username){

                    let url = `https://superligafifa.herokuapp.com`;
            
                    await mailPasswordRecoveryConfirmation(data.username, data.name, url)
                    
                    return {passwordRecoveryConfirmationCompleted: "success"};
            
                }else{
            
                    return {error: data}
            
                }

            }else{

                return {invalidToken: "invalid token or already used"};

            }

        }else if(data === null){
    
            return {userNotfound: "user not found"};
    
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
    passwordRecoveryService,
    passwordRecoveryConfirmationService,
    getUserBySessionService,
    validateUser
}
