const Post = require("../models/post");
//const { post } = require("../routers");

module.exports.home = (req, res) => {
  // console.log(req.cookies)
  Post.find({})
    .populate("user")
    .exec((err, post) => {
      return res.render("home", {
        title: "Socially",
        description: "this is home page of socaially",
        post: post,
      });
    });
};
