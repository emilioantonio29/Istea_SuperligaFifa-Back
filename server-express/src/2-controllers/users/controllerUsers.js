// LAYER 2: CONTROLLER - USERS
const {getUserService} = require("../../3-services/users/serviceUsers");
const moment = require("moment");

/*
    HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
*/

class UserController{

    static root = (req, res) =>{
        res.status(200).json({welcome:`${moment(new Date()).format("DD/MM/YYYY")} - USER CONTROLLER`});      
    }

    static getUser = async (req, res) =>{

        let data = await getUserService(req.body.username, req.body.password)

        data.user ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data) 
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data)

    }

};

module.exports={
    UserController
}