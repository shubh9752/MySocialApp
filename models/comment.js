const mongoose = require("mongoose");

const cmntSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"Post"
    }

},{
    timestamps:true
});

const Comment=mongoose.model("Comment",cmntSchema);

module.exports=Comment;