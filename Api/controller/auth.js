import User from "../Model/User.js"
import bcrypt from  'bcryptjs';
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const register=async(req,res,next)=>{
  
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const user =new User({
            username:req.body.username,
            email:req.body.email,
            password: hash
        })   
        await user.save()
        res.status(201).json("user has been created")

    } catch (error) {
        next(err)
    }
}

export const login=async(req,res,next)=>{
  
    try {

        const user =await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"user not found"))

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"wrong username or password"))

        const token =jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT)

 

        const {password,isAdmin ,...otherdetail}=user._doc

        res.cookie("access_token",token,{httpOnly:true}).status(200).json({...otherdetail})
       
    } catch (err) {
        next(err)
    }
}