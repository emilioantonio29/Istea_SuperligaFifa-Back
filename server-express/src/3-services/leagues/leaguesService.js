// LAYER 3: SERVICE (business layer) - LEAGUES

const { getLeague } = require("../../4-DAOs/mongoDB/dao/leagues");

const getLeagueService = async (name) =>{

    if(!name || (name !== "LaLiga" && name !== "Premier League" && name !== "Serie A")){
        return {badRequest: "Missing or wrong data"};
    }

    try {

        let res = await getLeague({league: name});
        
        return {leagues: res}
        
    } catch (error) {

        return {error: error}

    }

}

module.exports = {
    getLeagueService
}