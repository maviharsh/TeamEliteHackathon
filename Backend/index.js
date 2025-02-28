import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { signuprouter,loginrouter } from "./Routes/index.js";


const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
    origin: "http://localhost:3001", // Your React frontend URL
    credentials: true
  }));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const port = process.env.PORT || 4000;
const URL = process.env.MONGO_PASS;

// MongoDB connection
mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err.message);
    });

// Routes
app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/hi", (req, res) => {
    res.send("Hi");
});


app.use('/api/signupform', signuprouter)
app.use('/api/loginform',loginrouter)

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
