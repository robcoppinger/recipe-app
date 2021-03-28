import jwt from 'jsonwebtoken'
import { TAudience } from 'types/Types'
import { v4 as uuidV4 } from 'uuid'
import { env } from '../env'

export const signJwt = (payload: any, audience: TAudience) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: payload,
    },
    env.app.secret,
    { audience, jwtid: uuidV4() },
  )
}
