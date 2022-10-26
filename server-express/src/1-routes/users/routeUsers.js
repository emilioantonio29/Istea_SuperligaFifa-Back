const express = require('express');
const { UserController } = require('../../2-controllers/users/controllerUsers');

// LAYER 1: ROUTES - USERS
const routerUsers = () =>{

  const routerApi = express.Router();

  routerApi.get('/', UserController.root);
  routerApi.post('/getuser', UserController.getUser);
  routerApi.post('/createuser', UserController.createUser);
  routerApi.post('/userconfirmation', UserController.createUserConfirmation);

  return routerApi;

}

module.exports ={
    routerUsers
}