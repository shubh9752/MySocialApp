const Post=require("../models/post");
const Comment=require("../models/comment");

module.exports.create=async (req,res)=>{
  try{
    await Post.create({
      content:req.body.content,
      user:req.user._id
    });
    req.flash("success","posted successfully")
    return res.redirect("back");

  }catch(err){
    req.flash("error","something is wrong please try later")
    console.log("error in post controller create ",err);
    return;

  }
   
};

module.exports.delete=async (req,res)=>{
  try{
    let post=await Post.findById(req.params.id);
    //.id means converting the object id into string
    if(post.user==req.user.id){
      post.remove();

      await Comment.deleteMany({post:req.param.id});
      req.flash("success","post deleted")
      return res.redirect("back");
     }
     else{
      req.flash("error","you cant delete this post")
      return res.redirect("back");
    }

  }catch(err){
    req.flash("error",err)
    console.log(`error is in post controller delete function ${err}`);
    return;

  };
 
};