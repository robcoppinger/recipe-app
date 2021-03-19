import 'reflect-metadata'
import express from 'express'
import { useExpressServer, Action } from 'routing-controllers'
import { env } from './env'
import cookieParser from 'cookie-parser'
import { createConnection } from 'typeorm'
import cors from 'cors'

export async function createServer() {
  const dirs = {
    controllers: [__dirname + '/controllers/**/*.{ts,js}'],
    middlewares: [__dirname + '/middlewares/*.{ts,js}'],
    entities: [__dirname + '/entities/**/*.{ts,js}'],
    migrations: [__dirname + '/migration/*.{ts,js}'],
  }

  let retries = 5

  while (retries) {
    try {
      await createConnection({
        type: env.db.type as any,
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging,
        entities: dirs.entities,
        migrations: dirs.migrations,
      })
      break
    } catch (err) {
      console.log(err)
      retries -= 1
      console.log(`retries left: ${retries}`)
      await new Promise((res) => setTimeout(res, 3000))
    }
  }

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(cors())

  useExpressServer(app, {
    controllers: dirs.controllers,
    middlewares: dirs.middlewares,
    defaultErrorHandler: true,
    classTransformer: true,
    validation: true,
    currentUserChecker: async (action: Action) => {
      if (action.request.user) {
        return action.request.user
      }
    },
    authorizationChecker: async (action: Action, roles: any) => {
      // if (!action.request.user) return false
      // const user = action.request.user
      // if (user && !roles.length) return true
      // if (user && roles.includes(user.role)) return true
      return false
    },
  })

  return app.listen(env.port)
}
