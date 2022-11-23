module.exports.home=(req,res)=>{
    return res.render("home",{
        title:"Socially",
        description:"this is home page of socaially"
    });
}