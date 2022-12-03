 const express=require("express");
 const router=express.Router();
 const passport=require("passport");
 const checkAuthentication=require("../config/passport-local-strategy")

 const postController=require("../controllers/Post_contr");

 router.post("/create",checkAuthentication,postController.create);
 router.get("/delete/:id",checkAuthentication,postController.delete)

 module.exports=router;