const { json } = require("express");
const axios = require("axios");

const { FixtureCreator } = require("fixture-creator")

const { createTorneoDB } = require("../../4-DAOs/mongoDB/dao/torneo");

createTorneoDB
const fixtureCreator = new FixtureCreator();



class TournamentController {

    static createTournament = async (req, res) =>{

        let teams = req.body['equipos']
        let torneo = fixtureCreator.createLeagueFixture(teams, false)

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

}

module.exports = {
    TournamentController
}