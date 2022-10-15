// LAYER 2: CONTROLLER - USERS

class UserController{

    static root = (req, res) =>{
        res.json({saludo:"Welcome: Users Controller"});
      }
    
    static getUser = (req, res) =>{
        console.log(req.body);
        // console.log(req.headers);
        res.json({response: "OK"});
    }

};

module.exports={
    UserController
}