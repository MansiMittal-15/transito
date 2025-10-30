import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName :{
    type: String, 
    required: true,
  },
  lastName: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);