import { User } from '../Model/UserModel.js';
import { uploadToCloudinary } from '../services/cloudinary.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name,type,address,city,state,contact,email,password, image } = req.body;
    
    try {
    const duplicateemail=await User.exists( {email: email} );  
    const duplicatenumber=await User.exists({contact:contact});    
    if(duplicateemail)
    {
        console.log("not saved");
        return res.status(400).json({error:"User with this email already exists"});
    }
    else if(duplicatenumber)
    {
        console.log("not saved");
        return res.status(400).json({error:"User with this number already exists"});
    }
    else{
        let imageData = {};
        if (image) {
            const results = await uploadToCloudinary(image, "uploads");
            console.log("Cloudinary Results:", results); // Debugging
            imageData = {
                url: results.url, // Ensure this field exists
                publicId: results.publicId, // Ensure this field exists
            };
        } else {
            throw new Error("Image is required but not provided");
        }

        console.log("Image Data:", imageData); // Debugging
       
        const hashedpassword = await bcrypt.hash(password, 10);
       
        const user = User.create({
            name,
            type,
            address,
            city,
            state,
            email,
            contact,
            password:hashedpassword,
            image: imageData,
        });
       
        console.log("document saved");
        const token=jwt.sign({"email":email},process.env.JWT_SECRET);
        console.log(token);
        res.cookie("token",token,{
          httpOnly: true,       // Prevents client-side JS access
          secure: false,        // Secure flag for HTTPS
          sameSite: "lax"       // Adjust to your CORS needs ('lax' is a safe default)
        });
        
        return res.status(200).json(user);
    }
        
    } catch (e) {
        console.error("Error saving to MongoDB:", e);
        res.status(500).json({ error: e.message || "A server error occurred with this request" });
    }
};

