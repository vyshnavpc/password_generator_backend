import express from 'express';
import { addPassword, getAllPassword } from '../controllers/Password.js';
const passwordRouter = express.Router();

passwordRouter.get('/', getAllPassword).post('/', addPassword).delete('/',)


export default passwordRouter