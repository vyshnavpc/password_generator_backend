import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String },
    phone: { type: String },
})

const User = model('users', userSchema);
export default User