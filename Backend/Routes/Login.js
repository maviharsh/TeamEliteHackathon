import express from "express";

import { login,logout } from "../Controllers/Login.js";

export const loginrouter = express.Router()

loginrouter.post('/', login)

loginrouter.post("/logout",logout);

