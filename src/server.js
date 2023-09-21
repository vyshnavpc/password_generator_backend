import express from "express";
import cors from 'cors';
import { MONGODB_URL, PORT } from './config/env-variables.js'
import authRouter from "./routes/authRoute.js";
import mongoose from "mongoose";
import passwordRouter from "./routes/passwordRoute.js";
class Server {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.path = {
            auth: '/api/auth',
            password: '/api/password',
        }
        this.middlewares()
        this.database()
        this.routes()
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(cors());
    }
    database() {
        mongoose.connect(MONGODB_URL)
            .then(() => console.log('Database connected'))
            .catch((err) => {
                console.log('Failed to connected db');
                console.log(err.message);
            })
    }
    routes() {
        this.app.use(this.path.auth, authRouter)
        this.app.use(this.path.password, passwordRouter)
        this.app.use('/', (req, res) => {
            res.send('welcome to pass word generator');
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        })
    }
}

export default Server