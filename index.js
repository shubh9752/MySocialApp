const express=require("express");
const app=express();
const port=3000;


app.listen(port, (err) =>{
    if (err){
        console.log(`theres is an error running server at ${port}: ${err}`)
    }
    console.log(`hurray!! your server is running at port: ${port}`)
})