const Comment= require("../models/comment");
const Post=require("../models/post");
const mongoose=require("mongoose");
const { ObjectId } = require('mongodb');

module.exports.create=async (req,res)=>{
    try{
         //console.log(req.body.post);
    let id=ObjectId((req.body.post).trim());
    let post=await Post.findById(id);
        // if(err){
        //     console.log(err)
        // }
        if(post){
           // console.log(" erro in line 12"+req.body.content+" "+req.user._id)
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id

            });
                post.comment.push(comment);
                post.save();

                res.redirect("/");
            };

    }catch(err){
        console.log(`err in creating post: ${err}`);
        return;

    }
   
           
       
   
};

module.exports.delete=async(req,res)=>{
    try{
        let comment=await Comment.findById(req.params.id);//=>{
    //     console.log("line 40")
    //     console.log(comment.user)
        if(comment.user == req.user.id){
        ///    console.log(user +" this is user error")
            let postId=comment.post;
            comment.remove();
             let post=await Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});//,(err,post)=>{
              return res.redirect("back");
            // });
        }else{
            return res.redirect("back")
        }

    }catch(err){
        console.log(`err in deleting comment ${err}`);
        return;

    }
    
     

};