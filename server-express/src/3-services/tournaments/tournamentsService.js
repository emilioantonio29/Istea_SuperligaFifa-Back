// LAYER 3: SERVICE (business layer) - TOURNAMENTS

const {createTorneoStep1DB, getTorneoDB, getTorneoJugadorDB, updateTorneoJugadorDB, createTorneoDB, updateTorneoDB} = require("../../4-DAOs/mongoDB/dao/torneo");
const Encrypter = require("../encryption/encrypter");
const {validateUser} = require("../users/serviceUsers");
const { FixtureCreator } = require("fixture-creator");
const fixtureCreator = new FixtureCreator();
const {getLeagueService} = require("../leagues/leaguesService")

const createTournamentStep1Service = async (torneoObject, token) =>{

    if( !token || 
        !torneoObject.nombre ||
        !torneoObject.cantidadjugadores || 
        !torneoObject.liga || 
        (torneoObject.cantidadjugadores > 20 || torneoObject.cantidadjugadores < 4 || torneoObject.cantidadjugadores % 2 == 1) || 
        (torneoObject.liga !== "LaLiga" && torneoObject.liga !== "Premier League" && torneoObject.liga !== "Serie A")){

        return {badRequest: "Missing or wrong data"};

    }

    let data = await validateUser(token)

    if(data.user){


        if(data.user.user.admin == false){

            return {unauthorized: "Only admin can create tournaments"};

        }

        
        try {
            
            let torneo = {
                cantidadjugadores: torneoObject.cantidadjugadores,
                torneoid: "",
                owner: data.user.user.username,
                jugadores: torneoObject.jugadores ? torneoObject.jugadores : [],
                liga: torneoObject.liga,
                cerrado: false,
                nombre: torneoObject.nombre.toLowerCase()
            }
    
            let tournament = await createTorneoStep1DB(torneo);
    
            return tournament

        } catch (error) {

            return {error: error}
            
        }

    }else{

        return {error: data}

    }

}

const createTournamentStep2Service = async (token, id) =>{

    // FALTA USAR MOMENT Y ASIGNAR CALENDARIO A LAS FECHAS
    // METODO PARA GRABAR RESULTADOS
    // METODO PARA DEVOLVER TABLA DE POSICIONES

    try {

        if(!token || !id){

            return {badRequest: "Missing or wrong data"};
    
        }

        let data = await validateUser(token)

        if(data.user){

            let tournament = await getTorneoDB({ _id: id });

            if(tournament.length > 0){

                if(tournament[0].jugadores.length == tournament[0].cantidadjugadores && tournament[0].cerrado == false && tournament[0].torneoid == "" && data.user.user.username == tournament[0].owner){

                    let leagues = await getLeagueService(tournament[0].liga);
                    let arrayLeagues = leagues.leagues.teams;

                    let FinalPlayers = []

                    tournament[0].jugadores.forEach((element, index) => {
                        let result = arrayLeagues[Math.floor(Math.random()*arrayLeagues.length)];
                        var indexResult = arrayLeagues.indexOf(result);
                        arrayLeagues.splice(indexResult, 1);
                        FinalPlayers.push(JSON.stringify({equipo: result, jugador: element, resultado: ""}));
                    })

                    console.log(FinalPlayers)

                    let torneo = await fixtureCreator.createLeagueFixture(FinalPlayers, false)
                
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
                        name: tournament[0].nombre
                    }

                    let res = await createTorneoDB(torneoNuevo);

                    console.log(res.fechas[0].partidos)

                    await updateTorneoDB(id, {torneoid: res._id})

                    return res   

                }else{
                    return {unauthorized: "El torneo ya se encuentra iniciado o no eres el administrdor del mismo."}
                }

            }else{
                return {notFound: "no se encontraron torneos."}
            }

        }else{
            return {error: data}
        }

    } catch (error) {
        return {error: error};
    }


}

const getTournamentsByAdminService = async (token) =>{

    if(!token){

        return {badRequest: "Missing or wrong data"};

    }
    
    let data = await validateUser(token)

    if(data.user){

        try {

            let tournament = await getTorneoDB({owner: data.user.user.username});

            if(tournament.length == 0 || tournament[0]._id){
                return {tournaments: tournament}
            }else{
                return {error: tournament}
            }
                
        } catch (error) {

            return {error: error}
            
        }

    }else{

        return {error: data}

    }

}

const getTournamentsByPlayerService = async (token) =>{

    if(!token){

        return {badRequest: "Missing or wrong data"};

    }
    
    let data = await validateUser(token)

    if(data.user){

        try {

            let tournament = await getTorneoJugadorDB(data.user.user.username);

            if(tournament.length == 0 || tournament[0]._id){
                return {tournaments: tournament}
            }else{
                return {error: tournament}
            }
                
        } catch (error) {

            return {error: error}
            
        }

    }else{

        return {error: data}

    }


}

const getTournamentsOpenService = async (token, name) =>{

    if(!token || !name){

        return {badRequest: "Missing or wrong data"};

    }
    
    let data = await validateUser(token)

    if(data.user){

        try {

            let tournament = name == "all" ? 
            
                await getTorneoDB({ $and: [ { cerrado: { $eq: false } }, { torneoid: { $eq: "" } } ] })
                :
                await getTorneoDB({ nombre: name })

            if(tournament.length == 0 || tournament[0]._id){
                return {tournaments: tournament}
            }else{
                return {error: tournament}
            }
                
        } catch (error) {

            return {error: error}
            
        }

    }else{

        return {error: data}

    }

}

const updateTournamentsPlayerService = async (token, id) =>{

    if(!token || !id){

        return {badRequest: "Missing or wrong data"};

    }
    
    let data = await validateUser(token)

    if(data.user){

        try {

            let tournament = await getTorneoDB({ _id: id });

            if(tournament.length > 0){

                if(tournament[0].jugadores.length < tournament[0].cantidadjugadores && tournament[0].cerrado == false && tournament[0].torneoid == ""){

                    if(tournament[0].jugadores.indexOf(data.user.user.username) > -1){
                        return {unauthorized: "Ya te encuentras inscripto en este torneo."}
                    }else{
                        let res = await updateTorneoJugadorDB(id, data.user.user.username)

                        if(res.acknowledged){

                            let tournaments = await getTorneoDB({ $and: [ { cerrado: { $eq: false } }, { torneoid: { $eq: "" } } ] })

                            return {tournaments: tournaments}
                            
                        }else{

                            return {error: res}

                        }
                    }


                }else{
                    return {unauthorized: "No hay cupos disponibles en el torneo."}
                }

            }else{
                return {notFound: "no se encontraron torneos."}
            }
                
        } catch (error) {

            return {error: error}
            
        }

    }else{

        return {error: data}

    }

}



module.exports = {
    createTournamentStep1Service,
    getTournamentsByAdminService,
    getTournamentsByPlayerService,
    getTournamentsOpenService,
    updateTournamentsPlayerService,
    createTournamentStep2Service
}
