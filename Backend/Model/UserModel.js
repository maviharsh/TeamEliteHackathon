import {model} from 'mongoose';
import {UserSchema} from "../Schema/UserSchema.js";

export const User=model("user",UserSchema);
