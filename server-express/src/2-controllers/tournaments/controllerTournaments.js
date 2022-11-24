const { json } = require("express");
const axios = require("axios");
const { FixtureCreator } = require("fixture-creator")
const { createTorneoDB } = require("../../4-DAOs/mongoDB/dao/torneo");
const { createTournamentStep1Service, getTournamentsByAdminService, getTournamentsByPlayerService, getTournamentsOpenService } = require("../../3-services/tournaments/tournamentsService")

createTorneoDB
const fixtureCreator = new FixtureCreator();

class TournamentController {

    static createTournament = async (req, res) =>{

        let teams = req.body['equipos']
        let torneo = await fixtureCreator.createLeagueFixture(teams, false)

        let { weeks: fechas } = torneo

        let fechasTorneo = []

        fechas.forEach((element, index) => {
            let { matches: partidos } = element
            let tituloDeFecha = `Fecha ${index+1}`

            let partidosTorneo = []
            partidos.forEach((element) => {
                let { home: local, away: visitante } = element
                // console.log(`\t${local} vs ${visitante}`)
                let partido = {
                    local: local,
                    visitante: visitante
                }
                partidosTorneo.push(partido)
            });
            let fecha = {
                partidos: partidosTorneo,
                titulo: tituloDeFecha
            }
            fechasTorneo.push(fecha)

        });
        let torneoNuevo = {
            fechas: fechasTorneo,
            name: req.body['nombre']
        }
        try {
            let data = await createTorneoDB(torneoNuevo);
            res.status(200).json(data); 
            
        } catch (error) {
            console.log("Error al crear torneo_______________")
            console.log(error)
            return {error: error};
        }
    
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

}

module.exports = {
    TournamentController
}