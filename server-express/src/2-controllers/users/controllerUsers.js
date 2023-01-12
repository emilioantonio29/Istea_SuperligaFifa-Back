// LAYER 2: CONTROLLER - USERS
const {
    getUserService, 
    createUserService, 
    createUserConfirmationService, 
    passwordRecoveryService, 
    passwordRecoveryConfirmationService, 
    getUserBySessionService,
    passToAdminService,
    testAppService} = require("../../3-services/users/serviceUsers");
const moment = require("moment");

/*
    HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
*/

class UserController{

    static root = async (req, res) =>{

        console.log(moment(new Date()).format("YYYY/MM/DD"))
        let date = await moment(new Date()).add(0, 'days').format("YYYY/MM/DD")

        console.log(date)
        // console.log(moment(date).format("YYYY/MM/DD"))

        // let data2 = moment(date).format("DD/MM/YYYY")
        // res.status(200).json({welcome:`${data2} - USER CONTROLLER`});      
        res.status(200).json({welcome:`date`});     
    }

    static rootPost = (req, res) =>{

        console.log("================================================================")
        console.log(req.body)

        res.status(200).json({welcome:`${moment(new Date(), "DD-MM-YYYY").add('days', 7)} - USER CONTROLLER`});      
    }

    static getUser = async (req, res) =>{

        let data = await getUserService(req.body.username, req.body.password)

        data.user ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data)

    }

    static getUserSession = async (req, res) =>{

        let data = await getUserBySessionService(req.body.token)

        data.user ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.unauthorized ? res.status(403).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data)

    }

    static createUser = async (req, res) =>{

        let data = await createUserService(req.body);

        data.user ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.userExists ? res.status(401).json(data)
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data)

    }

    static createUserConfirmation = async (req, res) =>{

        let data = await createUserConfirmationService(req.body);

        data.confirmationCompleted ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.confirmationNotCompleted ? res.status(404).json(data)
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data)

    }

    static createPasswordRecovery = async (req, res) =>{

        let data = await passwordRecoveryService(req.body.username);

        data.passwordRecoveryCompleted ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.userNotValidated ? res.status(401).json(data)
        : data.confirmationNotCompleted ? res.status(404).json(data)
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data)

    }

    static confirmPasswordRecovery = async (req, res) =>{

        let data = await passwordRecoveryConfirmationService(req.body);

        data.passwordRecoveryConfirmationCompleted ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.userNotValidated ? res.status(401).json(data)
        : data.invalidToken ? res.status(401).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data)
        
    }

    static passToAdmin = async(req, res) =>{

        let data = await passToAdminService(req.body.username)

        res.status(200).json(data) 
    }

    static testApp = async(req, res) =>{

        //return res.status(200).json({ok:"ok"}) 
        let data = await testAppService(req.body)

        res.status(200).json(data) 
    }

};

module.exports={
    UserController
}