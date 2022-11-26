const express=require("express");
const router=express.Router();
const passport = require("passport");
const checkAuthentication=require("../config/passport-local-strategy")

const userController = require("../controllers/User_contr");

router.get("/profile",checkAuthentication,userController.profile);
router.get("/sign-up",userController.signUp);
router.get("/sign-in",userController.signIn);

router.post("/userCreated",userController.userCreated);

//using passport as a middleware
router.post("/userSignedIn",passport.authenticate(
    "local",
    {failureRedirect:"/user/sign-in"},
),userController.userSignedIn);

router.get("/logout",userController.signOut);

module.exports=router;