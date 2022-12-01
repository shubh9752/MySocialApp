const express=require("express");
const router=express.Router();
const postController=require("../controllers/Post_contr");

router.post("/create",postController.create);

module.exports=router;