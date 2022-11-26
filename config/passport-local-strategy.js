
 const passport=require("passport");
 const LocalStrategy = require("passport-local").Strategy;
 const User=require("../models/user");


 //using passport authentication
 passport.use(new LocalStrategy({
     usernameField:"email"
    },
   function(email,password,done){
    //finding a user and establishing his/her identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("there is an error finding email-->passport");
            return done(err);
        }
        //if user is not found
        if(!user || user.password != password){
            console.log("invalid userName/password");
            return done(null,false);
        }
        return done(null,user);
      
    });

}));
 //serializing user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
     done(null,user.id) });

 //deserializing user to decide which key is to be kept in cookies
 passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("there is an error in finding the user");
            return done(err);
        }
        return done(null,user)
        
    });
    
});

passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/user/sign-in");

};

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
};

module.exports=passport;
module.exports=passport.checkAuthentication;

// passport.checkAuthentication=function(req,res,next){
// //if user is signed in then passing the req to next function
//     if(req.isAuthenticated()){
//         return next();
//     }
//     //if user is not signed in
//     return res.redirect("/user/sign-in");

// };

// passport.setAuthenticatedUser=function(req,res,next){
//     if(req.isAuthenticated()){
//         res.locals.user=req.user;
//     };
//     next();
// }
// check if the user is authenticated
// passport.checkAuthentication = function(req, res, next){
//     // if the user is signed in, then pass on the request to the next function(controller's action)
//     if (req.isAuthenticated()){
//         return next();
//     }

//     // if the user is not signed in
//     return res.redirect('/user/sign-in');
// }

// passport.setAuthenticatedUser = function(req, res, next){
//     if (req.isAuthenticated()){
//         // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
//         res.locals.user = req.user;
//     }

//     next();
// }


//exporting passport
