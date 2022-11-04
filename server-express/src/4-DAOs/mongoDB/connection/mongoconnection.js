const mongoose = require("mongoose");

class mongoConnectionNoSingleton{

    /*
        - MongoDB: https://www.mongodb.com/docs/drivers/node/current/quick-reference/

        - Connection URI or stringConnection: mongodb://user:pass@sample.host:27017/database?maxPoolSize=20&w=majority
                                              |------|-----------|-----------------|--------|------------------------|
                                              protocol credential  hostnameIP+PORT  database    connection Options
        
        - Understanding Mongoose connection options (CONFIG): mongodb://user:pass@sample.host:27017/database?maxPoolSize=20&w=majority
    */
    
    static stringConnection = process.env.MONGO_URI;

    static config = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    
    static async mongoConnection(){
        try {

            let uri = await mongoConnectionNoSingleton.stringConnection;
            let con = await mongoConnectionNoSingleton.config

            return await mongoose.connect(uri, con)

        } catch (error) {
            console.log("Error al conectarse a MongoAtlas")
            console.log(error)
        }
    }

    static async mongoDisconnect(){
        try {
            return await mongoose.disconnect();
        } catch (error) {
            console.log("Error al desconectarse de MongoAtlas")
        }
    }
}

module.exports = mongoConnectionNoSingleton