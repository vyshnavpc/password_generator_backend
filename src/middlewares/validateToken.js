import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config/env-variables.js';
export const validateToken = (req, res, next) => {
    const token = req.cookies.authcookie;
    console.log(req.cookies.authcookie);
    jwt.verify(token, JWT_PRIVATE_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else if (data) {
            req.user = data
            next();
        }
    })
}