const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/socially_development");

const db=mongoose.connection;

db.on("error",console.error.bind(console,"there is err in connecting to mongodb"));

db.once("open",()=>{
    console.log("connected to mongodb")
});

module.exports=db;