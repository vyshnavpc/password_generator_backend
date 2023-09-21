import { JWT_PRIVATE_KEY, SALT_ROUND, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } from '../config/env-variables.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import twilio from 'twilio'
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
class Auth {
    constructor(user) {
        this.credentials = {
            name: user.name,
            phone: user.phone,
            otp: user.otp,
        }
    }
    async sendMessage(to) {
        const message = {
            to: "+91" + String(to), channel: "sms"
        }
        const result = client.verify.v2?.services(TWILIO_SERVICE_SID).verifications.create(message)
        return result;
    }
    async verifyMessage(to, code) {
        const message = {
            to: "+91" + String(to), code
        }
        const result = client.verify.v2?.services(TWILIO_SERVICE_SID).verificationChecks.create(message)
        return result;
    }
    async generateToken(data) {
        const token = jwt.sign(data, JWT_PRIVATE_KEY)
        return token
    }
    // async encryptPassword(password) {
    //     const saltRound = await bcrypt.genSalt(Number(SALT_ROUND))
    //     const salt = await bcrypt.hash(password, saltRound)
    //     return salt
    // }
    // async decryptPassword(password) {
    //     const status = await bcrypt.compare(this.credentials.password, password)
    //     return status
    // }
    async signup() {
        const alreadyExist = await User.find({ email: this.credentials.email }).count()
        if (alreadyExist) {
            throw new Error('User already exist');
        }
        const OtpStatus = await this.verifyMessage(this.credentials.phone, this.credentials.otp)
        if (OtpStatus && OtpStatus.status !== "approved") {
            throw new Error('Otp is not verified')
        }
        const newUser = new User({
            name: this.credentials.name,
            phone: this.credentials.phone,
        })
        await newUser.save();
        const token = await this.generateToken({ user_id: newUser._id })
        return { ...newUser._doc, token };
    }

    async login() {
        const user = await User.findOne({ phone: this.credentials.phone })
        if (!user) {
            throw new Error('User not found')
        }
        const OtpStatus = await this.verifyMessage(user.phone, this.credentials.otp)
        if (OtpStatus && OtpStatus.status !== "approved") {
            throw new Error('Invalid otp')
        }
        const token = await this.generateToken({ user_id: user._id })
        return { ...user._doc, token }
    }
}

export default Auth
