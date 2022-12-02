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