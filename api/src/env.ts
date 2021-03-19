import dotenv from 'dotenv'

dotenv.config()
function normalizePort(port: string): number {
  return parseInt(port, 10)
}
function toBool(value: string): boolean {
  return value === 'true'
}

export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  port: normalizePort(process.env.APPLICATION_PORT) || 5000,
  app: {
    secret: process.env.APPLICATION_SECRET,
  },
  db: {
    type: process.env.DATABASE_TYPE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: normalizePort(process.env.DATABASE_PORT),
    synchronize: toBool(process.env.DATABASE_SYNCHRONIZE),
    logging: toBool(process.env.DATABASE_LOGGING),
  },
}
