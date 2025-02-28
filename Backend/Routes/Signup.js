import express from "express";

import { signup } from "../Controllers/Signup.js";

export const signuprouter = express.Router()

signuprouter.post('/', signup)



