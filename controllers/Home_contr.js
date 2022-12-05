const Post = require("../models/post");
//const { post } = require("../routers");
const User = require("../models/user");

module.exports.home = async (req, res) => {
  // console.log(req.cookies)
  try {
    let post = await Post.find({})
      .populate("user")
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});
    return res.render("home", {
      title: "Socially",
      description: "this is home page of socaially",
      post: post,
      allUsers: users,
    });
  } catch (err) {
    console.log("this error creating problem: ");
    return;
  }
};
