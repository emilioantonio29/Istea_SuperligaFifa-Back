const express = require('express');
const { UserController } = require('../../2-controllers/users/controllerUsers');

// LAYER 1: ROUTES - USERS
const routerUsers = () =>{

  const routerApi = express.Router();

  routerApi.get('/', UserController.root);
  routerApi.post('/', UserController.rootPost);
  routerApi.post('/getuser', UserController.getUser);
  routerApi.post('/getusersession', UserController.getUserSession);
  routerApi.post('/createuser', UserController.createUser);
  routerApi.post('/userconfirmation', UserController.createUserConfirmation);
  routerApi.post('/passwordrecovery', UserController.createPasswordRecovery);
  routerApi.post('/passwordrecovery-confirmation', UserController.confirmPasswordRecovery);
  routerApi.post('/goadmin', UserController.passToAdmin);

  routerApi.post('/testapp', UserController.testApp);

  return routerApi;

}

module.exports ={
    routerUsers
}