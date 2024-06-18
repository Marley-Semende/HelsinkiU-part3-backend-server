import mongoose, { Schema, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then((result) => {
    console.log("Connected to MongoDB database successfully!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB database:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
