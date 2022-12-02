const express=require("express");
const router=express.Router();
const passport=require("passport");
const checkAuthentication=require("../config/passport-local-strategy")

const cmntController=require("../controllers/comment_contr");

router.post("/create",checkAuthentication,cmntController.create);

module.exports=router;