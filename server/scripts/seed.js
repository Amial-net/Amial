const mongoose = require("mongoose")
require("dotenv").config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    }
    catch(err){
        console.log("Failed to connect to database",err);
        throw err;
    }
}

module.exports ={
    connectDB
}