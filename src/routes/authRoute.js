
import express from 'express';
import { Login, Signup, getOtp, } from '../controllers/Auth.js';
const authRouter = express.Router();

authRouter.get('/login', Login).post('/signup', Signup);
authRouter.get('/otp', getOtp);

export default authRouter