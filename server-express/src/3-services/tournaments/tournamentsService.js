// LAYER 3: SERVICE (business layer) - USERS

const {createTorneoStep1DB, getTorneoDB, getTorneoJugadorDB} = require("../../4-DAOs/mongoDB/dao/torneo");
const Encrypter = require("../encryption/encrypter");
const {validateUser} = require("../users/serviceUsers")


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
                torneoid: null,
                owner: data.user.user.username,
                jugadores: torneoObject.jugadores ? torneoObject.jugadores : [],
                liga: torneoObject.liga,
                cerrado: null,
                nombre: torneoObject.nombre
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

const getTournamentsByAdminService = async (token) =>{

    if(!token){

        return {badRequest: "Missing or wrong data"};

    }
    
    let data = await validateUser(token)

    if(data.user){

        try {

            let tournament = await getTorneoDB({username: data.user.user.username});

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


module.exports = {
    createTournamentStep1Service,
    getTournamentsByAdminService,
    getTournamentsByPlayerService
}
