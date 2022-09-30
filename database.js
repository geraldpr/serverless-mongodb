const MongoClient = require("mongodb").MongoClient;

let cachedDb = null;

const connectToDatabase = async () => {
  if(cachedDb) {
    console.log("Use existing connection");
    return Promise.resolve(cachedDb);
  } 
  else {
    return MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((client) =>{
        let db = client.db("Demo")
        console.log("New Database Connection");
        cachedDb = db;
        return cachedDb;
      }).catch((error) =>{
        console.log("Mongo Connection error");
        console.log(error)
      })
  }
}

module.exports = connectToDatabase;
