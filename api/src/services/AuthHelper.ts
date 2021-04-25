import { RefreshToken } from '../entities/RefreshToken'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { getRepository } from 'typeorm'
import { TAccessTokenAudience, TAudience } from 'types/Types'
import { v4 as uuidV4 } from 'uuid'
import { env } from '../env'

interface IGenerateAccessToken {
  userId: number
  audience: TAccessTokenAudience
}

interface ICreateAndPersistRefreshToken {
  userId: number
  accessTokenAudience: TAccessTokenAudience
}

type RDecodeJwt = {
  aud: TAudience
  exp: number
  iat: number
  jti: string
  userId: number
  accessTokenAudience?: TAccessTokenAudience
}

export const generateAccessToken = ({
  userId,
  audience,
}: IGenerateAccessToken): string => {
  const getExp = () => {
    switch (audience) {
      case 'web':
        return moment().add(15, 'minutes').unix()
      case 'app':
        return moment().add(5, 'days').unix()
      default:
        return moment().add(15, 'minutes').unix()
    }
  }
  return jwt.sign(
    {
      exp: getExp(),
      userId,
    },
    env.app.secret,
    { audience, jwtid: uuidV4() },
  )
}

export const createAndPersistRefreshToken = async ({
  userId,
  accessTokenAudience,
}: ICreateAndPersistRefreshToken): Promise<string> => {
  const jwtToken = jwt.sign(
    {
      exp: moment().add(60, 'days').unix(),
      userId,
      accessTokenAudience,
    },
    env.app.secret,
    { audience: 'refreshToken', jwtid: uuidV4() },
  )

  const refreshTokenEntity = await RefreshToken.createFromToken(jwtToken)
  const tokenRepo = getRepository(RefreshToken)
  await tokenRepo.save(refreshTokenEntity)

  return jwtToken
}

export const decodeJwt = (token: string): Promise<RDecodeJwt | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.app.secret, (err: any, decoded: any) => {
      if (err) return resolve(undefined)

      return resolve(decoded)
    })
  })
}
