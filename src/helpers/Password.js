import Password from '../models/Passwords.js';
import mongoose from 'mongoose';
import User from '../models/user.js'
import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } from '../config/env-variables.js';
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
class PasswordGenerator {
    constructor() {

    }
    async removePassword(Id) {
        const result = await password.findOneAndRemove({ _id: Id })
        return result;
    }
    async verifyMessage(to, code) {
        const message = {
            to: "+91" + String(to), code
        }
        const result = client.verify.v2?.services(TWILIO_SERVICE_SID).verificationChecks.create(message)
        return result;
    }
    async addPassword(password, userId) {
        const savedPassword = new Password({
            user_id: new mongoose.Types.ObjectId(userId),
            password: password
        })
        await savedPassword.save();
        return savedPassword;
    }
    async allPassword(otp, userId) {
        const user = await User.findById(userId)
        console.log(userId);
        const OtpStatus = await this.verifyMessage(user.phone, otp)
        if (OtpStatus && OtpStatus.status !== "approved") {
            throw new Error('Otp is not verified')
        }
        const passwords = await Password.find({ user_id: new mongoose.Types.ObjectId(userId) })
        return passwords
    }
}

export default PasswordGenerator