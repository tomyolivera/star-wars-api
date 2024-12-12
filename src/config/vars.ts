import { config } from 'dotenv'
config()

const EnvVars = {
  PORT: parseInt(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: parseInt(process.env.JWT_EXPIRATION_TIME),
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: parseInt(process.env.DB_PORT)
}

export default EnvVars
