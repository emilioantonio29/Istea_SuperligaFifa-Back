const { json } = require("express");
const axios = require("axios");
const { FixtureCreator } = require("fixture-creator")
const { createTorneoDB } = require("../../4-DAOs/mongoDB/dao/torneo");
const {     createTournamentStep1Service, 
            getTournamentsByAdminService, 
            getTournamentsByPlayerService, 
            getTournamentsOpenService,
            updateTournamentsPlayerService,
            createTournamentStep2Service,
            createTournamentDetail
        } = require("../../3-services/tournaments/tournamentsService")
const {getLeagueService} = require("../../3-services/leagues/leaguesService")

class TournamentController {

    static createTournament = async (req, res) =>{

        let data = await createTournamentStep2Service(req.headers.token, req.body.id)

        res.status(200).json(data); 
    
    }

    static createTournamentStep1 = async (req, res) =>{

        let data = await createTournamentStep1Service(req.body, req.headers.token);

        data._id ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.unauthorized ? res.status(403).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data);

    }

    static getTournamentsByAdmin = async (req, res) =>{

        let data = await getTournamentsByAdminService(req.headers.token);

        data.tournaments ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.unauthorized ? res.status(403).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data);

    }

    static getTournamentsByPlayer = async (req, res) =>{

        let data = await getTournamentsByPlayerService(req.headers.token);

        data.tournaments ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.unauthorized ? res.status(403).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data);

    }

    static getTournamentsOpen = async (req, res) =>{

        const {name} = req.params

        let data = await getTournamentsOpenService(req.headers.token, name.toLowerCase());

        data.tournaments ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.unauthorized ? res.status(403).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data);

    }

    static updateTournamentPlayer = async (req, res) =>{

        let data = await updateTournamentsPlayerService(req.headers.token, req.body.id);

        data.tournaments ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.unauthorized ? res.status(403).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data);

    }

    static testLeagues = async (req, res) =>{
        let data = await getLeagueService(req.body.liga);
        res.json(data);
    }

    static tournamentDetail = async (req, res) =>{

        let data = await createTournamentDetail(req.headers.token, req.body.id);

        data._id ? res.status(200).json(data) 
        : data.badRequest ? res.status(400).json(data)
        : data.notValidated ? res.status(401).json(data)
        : data.unauthorized ? res.status(403).json(data)
        : data.notFound ? res.status(404).json(data) 
        : data.error ? res.status(503).json(data) 
        : res.status(500).json(data);
    }

}

module.exports = {
    TournamentController
}