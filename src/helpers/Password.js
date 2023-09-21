import Password from '../models/Passwords.js';
import mongoose from 'mongoose';
class PasswordGenerator {
    constructor() {

    }
    async removePassword(Id) {
        const result = await password.findOneAndRemove({ _id: Id })
        return result;
    }
    async addPassword({ password, userId }) {
        const savedPassword = new Password({
            user_id: new mongoose.Types.ObjectId(userId),
            password: password
        })
        await savedPassword.save();
        return savedPassword;
    }
    async allPassword(userId) {
        const passwords = await Password.find({ user_id: userId })
        return passwords
    }
}

export default PasswordGenerator