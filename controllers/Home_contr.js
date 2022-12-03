const Post = require("../models/post");
//const { post } = require("../routers");
const User=require("../models/user")

module.exports.home = (req, res) => {
  // console.log(req.cookies)
  Post.find({})
    .populate("user")
    .populate({
      path:"comment",
      populate:{
        path:"user"
      }
    })
    .exec((err, post) => {
      User.find({},(err,users)=>{
        return res.render("home", {
          title: "Socially",
          description: "this is home page of socaially",
          post: post,
          allUsers:users
        });

      })
     
    });
};
