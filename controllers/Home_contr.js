module.exports.home=(req,res)=>{
    console.log(req.cookies)
    return res.render("home",{
        title:"Socially",
        description:"this is home page of socaially"
    });
}