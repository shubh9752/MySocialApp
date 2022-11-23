const express=require("express");
const app=express();
const routes=require("./routers/index")
const port=3000;

// express routes
app.use('/', routes);
//setting view engine as ejs 
app.set("view engine","ejs");
app.set("views","./views");


app.listen(port, (err) =>{
    if (err){
        console.log(`theres is an error running server at ${port}: ${err}`)
    }
    console.log(`hurray!! your server is running at port: ${port}`)
});