import env from 'dotenv'
env.config()
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL
const SALT_ROUND = process.env.SALT_ROUND
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID
export {
    PORT,
    MONGODB_URL,
    SALT_ROUND,
    JWT_PRIVATE_KEY,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_SID,
}