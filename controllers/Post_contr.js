const Post=require("../models/post");
const Comment=require("../models/comment");

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

module.exports.delete=(req,res)=>{
  Post.findById(req.params.id,(err,post)=>{
    //.id means converting the object id into string
    if(post.user==req.user.id){
      post.remove();

      Comment.deleteMany({post:req.param.id},(err)=>{
        return res.redirect("back");
      });
    }else{
      return res.redirect("back");
    }
  })
}