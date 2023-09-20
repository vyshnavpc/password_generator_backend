
import express from 'express';
import { Login, Signup, } from '../controllers/Auth.js';
const authRouter = express.Router();

authRouter.get('/signup', Signup);
authRouter.get('/login', Login);

export default authRouter