import { Schema } from "mongoose";

export const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
          type:String,
          required:true,
    },
    address:{
        type:String,
        required: true,
    },
    city:{
        type:String,
        required: true,
    },state:{
        type:String,
        required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
     },
    contact:
    {
        type:Number,
        required: true,
    },
    password:{
          type:String,
          required:true,
    },
    image:
    {
            publicId:{
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
    }
},
    {timestamps: true}
);


