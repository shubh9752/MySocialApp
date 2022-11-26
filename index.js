const express=require("express");
const app=express();
const routes=require("./routers/index");
const port=3000;
const cookieParser=require("cookie-parser");
const expressLayouts=require("express-ejs-layouts");
const db=require("./config/mongoose");
//for session cookie
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");
//install connect-mongo@3
const MongoStore=require("connect-mongo")(session);

//to convert form data in json
app.use(express.urlencoded());
// using cookie parsder
app.use(cookieParser());

//setting path for assets 
app.use(express.static("./assets"));


//express layouts
app.use(expressLayouts);
//set static files for layouts and pages
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);



//setting view engine as ejs 
app.set("view engine","ejs");
app.set("views","./views");


//using mongo store to store the session cookie in the database
app.use(session({
    name:"socially",
    //change before production mode
    secret:"itssecret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:"disabled"
    },
    (err)=>{
        console.log(err || "mongo connection done");
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// express routes
app.use('/', routes);

app.listen(port, (err) =>{
    if (err){
        console.log(`theres is an error running server at ${port}: ${err}`)
    }
    console.log(`hurray!! your server is running at port: ${port}`)
});