import { JWT_PRIVATE_KEY, SALT_ROUND } from '../config/env-variables.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
class Auth {
    constructor(user) {
        this.credentials = {
            name: user.name,
            email: user.email,
            password: user.password,
        }
    }
    async generateToken(data) {
        const token = jwt.sign(data, JWT_PRIVATE_KEY)
        return token
    }
    async encryptPassword(password) {
        const saltRound = await bcrypt.genSalt(Number(SALT_ROUND))
        const salt = await bcrypt.hash(password, saltRound)
        return salt
    }
    async decryptPassword(password) {
        const status = await bcrypt.compare(this.credentials.password, password)
        return status
    }
    async signup() {
        const alreadyExist = await User.find({ email: this.credentials.email }).count()
        if (alreadyExist) {
            throw new Error('User already exist');
        }
        const password = await this.encryptPassword(this.credentials.password)
        const newUser = new User({
            name: this.credentials.name,
            email: this.credentials.email,
            password: password
        })
        await newUser.save();
        return newUser;
    }
    async login() {
        const user = await User.findOne({ email: this.credentials.email })
        if (!user) {
            throw new Error('User not found')
        }
        const status = await this.decryptPassword(user.password)
        if (!status) {
            throw new Error('Invalid Password')
        }
        const token = await this.generateToken({ user_id: user._id })
        return { ...user._doc, token }
    }
}

export default Auth
