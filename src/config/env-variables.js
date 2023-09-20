import env from 'dotenv'
env.config()
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL
const SALT_ROUND = process.env.SALT_ROUND
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
export { PORT, MONGODB_URL, SALT_ROUND,JWT_PRIVATE_KEY }