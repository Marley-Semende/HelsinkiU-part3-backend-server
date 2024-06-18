import mongoose, { Schema, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);
console.log("Connected to MongoDB database successfully!");
