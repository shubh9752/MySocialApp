const express=require("express");
const router=express.Router();
const postController=require("../controllers/Post_contr");

router.get("/",postController.post)

module.exports=router;