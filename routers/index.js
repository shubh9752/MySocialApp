const express=require("express");

console.log("router is working")
const router=express.Router();
const homeController=require("../controllers/Home_contr")

router.get("/",homeController.home)

module.exports = router;