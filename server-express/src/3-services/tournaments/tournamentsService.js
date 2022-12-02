// LAYER 3: SERVICE (business layer) - TOURNAMENTS

const {createTorneoStep1DB, getTorneoDB, getTorneoJugadorDB, updateTorneoJugadorDB, createTorneoDB, updateTorneoDB, getTorneoFixtureDB, updateFixturesDB, getTorneoFixtureDB2} = require("../../4-DAOs/mongoDB/dao/torneo");
const Encrypter = require("../encryption/encrypter");
const {validateUser} = require("../users/serviceUsers");
const { FixtureCreator } = require("fixture-creator");
const fixtureCreator = new FixtureCreator();
const {getLeagueService} = require("../leagues/leaguesService");
const moment = require("moment");

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
                jugadoresfull: [],
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

    // FALTA USAR MOMENT Y ASIGNAR CALENDARIO A LAS FECHAS - DONE
    // METODO PARA GRABAR RESULTADOS - DONE
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

                    console.log(leagues);

                    let arrayLeagues = leagues.leagues.teams;

                    let FinalPlayers = []
                    let FinalPlayersTemplate = []

                    tournament[0].jugadores.forEach((element, index) => {
                        let result = arrayLeagues[Math.floor(Math.random()*arrayLeagues.length)];
                        var indexResult = arrayLeagues.indexOf(result);
                        arrayLeagues.splice(indexResult, 1);
                        FinalPlayers.push(JSON.stringify({equipo: result, jugador: element, resultado: "", fullplayer: `${result} | ${element}`}));
                        FinalPlayersTemplate.push(`${result} | ${element}`);
                    })

                    let torneo = await fixtureCreator.createLeagueFixture(FinalPlayers, false)
                    let { weeks: fechas } = torneo
                    let fechasTorneo = []

                    let week = 0;
                    let date = await moment(new Date()).add(7, 'days').format("DD/MM/YYYY")
                
                    fechas.forEach((element, index) => {

                        let date2 = moment(date).format("DD/MM/YYYY")

                        let tituloDeFecha = `Fecha ${index+1} | ${moment(date2).add(week, 'days').format("DD/MM/YYYY")}`;
                        week = week+7;

                        let { matches: partidos } = element
                
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

                    await updateTorneoDB(id, {torneoid: res._id, jugadoresfull: FinalPlayersTemplate})

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

const createTournamentDetail = async (token, id) =>{

    try {

        if(!token || !id){

            return {badRequest: "Missing or wrong data"};
    
        }

        let data = await validateUser(token)

        if(data.user){

            let tournament = await getTorneoDB({ _id: id });

            if(tournament.length > 0){

                return tournament

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

const getFixtureService = async (token, id) =>{

    try {

        if(!token || !id){

            return {badRequest: "Missing or wrong data"};
    
        }

        let data = await validateUser(token)

        if(data.user){
            
            let tournament = await getTorneoFixtureDB({_id: id})
    
            if(tournament._id){
    
                return {tournament: tournament}
    
            }else{
                return {notFound: "no se encontraron torneos."}
            }

        }else{
            return {error: data}
        }

    } catch (error) {
        return {error: error}
    }
}

const updateFixtureService = async (idFixture, id, local, visitante) =>{

    /*let template = { 'fechas.0.partidos._id': { $eq: id } }
    let templateString = JSON.stringify(template);
    let templateToObjet = templateString.replace(/0/g, index)
    let consulta = JSON.parse(templateToObjet);
    let test = await getTorneoFixtureDB(consulta);*/

    let test = await getTorneoFixtureDB({_id: idFixture})

    // console.log(test)

    if(test !== null){
        for (let i = 0; i < test.fechas.length; i++) {
            // console.log("========================================", test.fechas[i].titulo)
        
              for(let j = 0; j < test.fechas[i].partidos.length; j++){
                // console.log(test.fechas[i].partidos[j])
        
                if(test.fechas[i].partidos[j]._id == id){

                    localObject = JSON.parse(test.fechas[i].partidos[j].local)
                    visitanteObject = JSON.parse(test.fechas[i].partidos[j].visitante)

                    localObject.resultado = local
                    visitanteObject.resultado = visitante

                    test.fechas[i].partidos[j].local = JSON.stringify(localObject)
                    test.fechas[i].partidos[j].visitante = JSON.stringify(visitanteObject)
                    console.log("result ack")

                }
            }
              
        }
    
        let data = await updateFixturesDB(test._id, {fechas: test.fechas})
    
        // console.log(data)
    
        return test;
    }else{
        return {error: test}
    }

}

const getTableService = async (idTorneo) =>{

    let torneo = await getTorneoDB({_id: idTorneo})

    let test = await getTorneoFixtureDB({_id: torneo[0].torneoid})

    let tabla = []

    for(let i = 0; i< torneo[0].jugadoresfull.length; i++){
        let objeto = {
            jugador: torneo[0].jugadoresfull[i],
            jugados: 0,
            ganados: 0,
            empatados: 0,
            perdidos: 0,
            golesafavor: 0,
            golesencontra: 0,
            puntos: 0
        }
        tabla.push(objeto)
    }

    for (let i = 0; i < test.fechas.length; i++) {
        // console.log("========================================", test.fechas[i].titulo)
    
          for(let j = 0; j < test.fechas[i].partidos.length; j++){
            // console.log(test.fechas[i].partidos[j])

            localObject = JSON.parse(test.fechas[i].partidos[j].local)
            visitanteObject = JSON.parse(test.fechas[i].partidos[j].visitante)

            // console.log("localObject", localObject)
            // console.log("visitanteObject", visitanteObject)

            tabla.forEach((e)=>{
	
                if(e.jugador == localObject.fullplayer){
                    //alert("test")
                    if(parseInt(localObject.resultado) >  parseInt(visitanteObject.resultado)){
                        e.puntos = e.puntos+3
                        e.ganados = e.ganados+1
                    }else if(parseInt(localObject.resultado) <  parseInt(visitanteObject.resultado)){
                        e.perdidos = e.perdidos+1
                    }else{
                        e.puntos = e.puntos+1
                        e.empatados = e.empatados+1
                    }

                    e.jugados=e.jugados+1
                    e.golesafavor=e.golesafavor+parseInt(localObject.resultado)
                    e.golesencontra=e.golesencontra+parseInt(visitanteObject.resultado)
                    
                }
                if(e.jugador == visitanteObject.fullplayer){
                    
                    if(parseInt(visitanteObject.resultado) >  parseInt(localObject.resultado)){
                        e.puntos = e.puntos+3
                        e.ganados = e.ganados+1
                    }else if(parseInt(visitanteObject.resultado) <  parseInt(localObject.resultado)){
                        e.perdidos = e.perdidos+1
                    }else{
                        e.puntos = e.puntos+1
                        e.empatados = e.empatados+1
                    }

                    e.jugados=e.jugados+1
                    e.golesafavor=e.golesafavor+parseInt(visitanteObject.resultado)
                    e.golesencontra=e.golesencontra+parseInt(localObject.resultado)

                }
              
            });
        }
          
    }

    let sortTable = tabla.sort((a, b) => (a.puntos < b.puntos) ? 1 : -1) 

    return {sortTable}

}


module.exports = {
    createTournamentStep1Service,
    getTournamentsByAdminService,
    getTournamentsByPlayerService,
    getTournamentsOpenService,
    updateTournamentsPlayerService,
    createTournamentStep2Service,
    createTournamentDetail,
    getFixtureService,
    updateFixtureService,
    getTableService
}
