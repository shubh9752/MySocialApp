const express=require("express");
const router=express.Router();

const UserController = require("../controllers/User_contr");

router.get("/profile",UserController.profile);

module.exports=router;