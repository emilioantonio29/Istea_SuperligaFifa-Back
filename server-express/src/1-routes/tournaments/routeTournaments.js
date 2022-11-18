const express = require('express');
const { TournamentController } = require('../../2-controllers/tournaments/controllerTournaments');

// LAYER 1: ROUTES - PAYMENTS
const routerTournaments = () =>{

  const routerApi = express.Router();
  

  routerApi.post('/new', TournamentController.createTournament)


  return routerApi;

}

module.exports ={
    routerTournaments
}