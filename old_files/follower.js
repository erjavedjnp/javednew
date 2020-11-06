import mongoose from "mongoose";
//const mongoose =require("mongoose");
const FollowerSchema = mongoose.Schema({
    name: String,
    last_name: String,
    photo: String,
    gmail: String,
    age:   String,
    gender: String,
    password: String,
    about: String
});

export default mongoose.model("followers",FollowerSchema);
