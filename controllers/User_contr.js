const User = require("../models/user");
module.exports.profile = (req, res) => {
  User.findById(req.params.id,(err,user)=>{
    return res.render("userProfile", {
      title: "User Profile",
      user_profile:user
     
    });

  })
  
};
module.exports.update=(req,res)=>{
  if(req.user.id==req.params.id){
    User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
      return res.redirect("back");
    });
  }else{
    return res.status(401).send("go you are not authorized")
  }
}

//rendering the signup page
module.exports.signUp = (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect("/user/profile");
  };


  return res.render("sign_up", {
    title: "Sign Up page",
  });
};

//rendering the signin page
module.exports.signIn = (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect("/user/profile");
  };



  return res.render("sign_in", {
    title: "Sign in page",
  });
};
//getting the sign up data //create
module.exports.userCreated = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("err in creating the signup", err);
      return;
    }
    if (!user) {
      User.create(req.body, (err, user)=> {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/user/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
//getting the signed in and creating session for user //createsession
module.exports.userSignedIn =  (req, res)=> {
  
  req.flash("success","bhadayi ho login ho gaye");
  return res.redirect("/");
};

module.exports.signOut=(req,res)=>{
  //new syntax in place of req.logout
  req.logout(req.user, err => {
    if(err) return next(err);
    req.flash("success","you are  log out")
    return res.redirect("/");
})};