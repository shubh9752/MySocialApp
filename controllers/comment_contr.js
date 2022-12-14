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
                req.flash("success","commented successfully");

                res.redirect("/");
            };

    }catch(err){
        req.flash("error","technical issue in commenting")
        console.log(`err in creating post: ${err}`);
        return;

    };
   
           
       
   
};

module.exports.delete=async(req,res)=>{
    try{
        let comment=await Comment.findById(req.params.id);//=>{
    //     console.log("line 42")
    //     console.log(comment.user)
        if(comment.user == req.user.id){
        ///    console.log(user +" this is user error")
            let postId=comment.post;
            comment.remove();
             let post=await Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});//,(err,post)=>{
            req.flash("success","comment deleted")
              return res.redirect("back");
            // });
        }else{
            req.flash("error","you can't delete comment")
            return res.redirect("back")
        }

    }catch(err){
        req.flash("error",err)
        console.log(`err in deleting comment ${err}`);
        return;

    };
    
     

};