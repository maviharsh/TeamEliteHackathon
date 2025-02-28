import { User } from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
          const user=await User.findOne({email:email});
          if(!user)
          {
            console.log("user not found");
            return res.status(404).json({error:"Email or password is incorrect"});
          }

          const ismatch=await bcrypt.compare(password,user.password);

          if(!ismatch)
          {
               console.log("wrong password");
               res.status(401).json({error:"Email or password is incorrect"});
          }
          else
          {
            console.log("correct password");
            const token=jwt.sign({email:user.email},process.env.JWT_SECRET);
            console.log(token);
            res.cookie("token",token,{
              httpOnly: true,       // Prevents client-side JS access
              secure: false, // Secure flag for HTTPS
              sameSite: "lax"       // Adjust to your CORS needs ('lax' is a safe default)
            });
            res.status(200).json("login successful");
          }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
}

export const logout=async (req,res)=>{
     try{
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false , // Make sure secure is true in production
      });
      res.status(200).json({message:"Logged out successfully"});
     }
     catch(err)
     {
      console.log(err);
      res.status(500).json({error:"Logged out successfully"});

     }
}