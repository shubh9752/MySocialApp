const Post=require("../models/post");

module.exports.create=(req,res)=>{
   
  Post.create({
    content:req.body.content,

    user:req.user._id
  },(err,post)=>{
    if(err){
        console.log("error in creating content of post: ",err);
        return;
    };
    return res.redirect("back");
  });
  
};