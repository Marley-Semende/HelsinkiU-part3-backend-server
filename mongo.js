import mongoose, { Schema, connect } from "mongoose";
import mongodb from "mongodb";

if (process.argv.length < 3) {
  console.log("give password, name and phone number as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const URI = `mongodb+srv://marleysemende:${password}@cluster4.3asachz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4`;

mongoose.connect(URI);
console.log("Connected to MongoDB database successfully!");

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name,
  phoneNumber,
});

person.save();
console.log(`${person} saved`);

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
