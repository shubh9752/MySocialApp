const express=require("express");

console.log("router is working")
const router=express.Router();
const homeController=require("../controllers/Home_contr")

//adding controller for home
router.get("/",homeController.home);
router.use("/user",require("./user"));
router.use("/post",require("./posts"));
router.use("/comments",require("./comment"));

module.exports = router;