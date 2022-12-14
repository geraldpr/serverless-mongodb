const connectToDatabase = require ("../../database");
const Responses = require("../common/API_Responses");

const validToken = num => {
  const regexp = /^[a-zA-Z0-9]{16}$/;
  if(regexp.test(num)) {
    return true;
  } else {
    return false;
  }
}

module.exports.getCreditCard = async (event, context) => {
  
  
  if (!event.pathParameters || !event.pathParameters.id) {        
    return Responses._400({message: "Missing parameters" }); 
  }
  
  if(!validToken(event.pathParameters.id)){
    return Responses._400({message: "Token Invalid" });
  }
  
  const id = event.pathParameters.id;
  
  try {

    const db = await connectToDatabase();
    const collection = await db.collection("tokens");

    const query = { token: id };
    const options = {
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id:0, card_number:1, expirante_year:1, expirante_month:1, email:1 },
    };

    const data = await collection.find({query, options}).toArrray();

    //var data = await db.get(params).promise(); 
    
    if (data.Item) {
      return Responses._200({message: "success", data: data });
    } else {
      return Responses._404({message: "not found" });  
    }
    
  } catch(error) {
    
    console.log("error: " + error);    
    console.log("id: " + id);    
    console.log(typeof id);    
    return Responses._400({message: error });

  }
  
};