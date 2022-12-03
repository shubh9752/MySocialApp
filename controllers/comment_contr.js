const Comment= require("../models/comment");
const Post=require("../models/post");
const mongoose=require("mongoose");
const { ObjectId } = require('mongodb');

module.exports.create=(req,res)=>{
    console.log(req.body.post);
    let id=ObjectId((req.body.post).trim());
    Post.findById(id,(err,post)=>{
        // if(err){
        //     console.log(err)
        // }
        if(post){
           // console.log(" erro in line 12"+req.body.content+" "+req.user._id)
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id

            },(err,comment)=>{
                if(err){
                    console.log("there is an error in post comment",err);
                    return;
                };
                post.comment.push(comment);
                post.save();

                res.redirect("/");
            });
           
        }else{
            console.log("inside else")
        };
    });

};

module.exports.delete=(req,res)=>{
    Comment.findById(req.params.id,(err,comment)=>{
        console.log("line 40")
        console.log(comment.user)
        if(comment.user == req.user.id){
        ///    console.log(user +" this is user error")
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},(err,post)=>{
                return res.redirect("back");
            });
        }else{
            return res.redirect("back")
        }

    });
};