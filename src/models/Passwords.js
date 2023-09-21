import mongoose, { Schema, model } from "mongoose";

const passwordSchema = new Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'Users' },
    password: { type: String }
})

const Password = model('Passwords', passwordSchema);
export default Password