const User=require("../models/user.js");
const Listing=require("../models/listing");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
        let{username,email,password}=req.body
        const newUser= new User({email,username});
        const registeredUser =await User.register(newUser,password);

        //after signup we can direct login by using this passport method
        req.login(registeredUser,(error)=>{
            if(error){
                return next(error);
            }
            req.flash("success","Welcome to wanderlust");
            res.redirect("/listings")
        })
    }catch(error){
        req.flash("error",error.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=  async(req,res)=>{
    req.flash("success", "Welcome back to Wanderlust!")
    let redirectUrl =res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((error)=>{
        if(error){
            return next(error);
        }
        req.flash("success","You are logged out now!");
        res.redirect("/listings");
    })
};