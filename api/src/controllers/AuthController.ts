import { User } from '../entities/User'
import { getRepository } from 'typeorm'
import { RefreshToken } from '../entities/RefreshToken'
import {
  BodyParam,
  JsonController,
  NotFoundError,
  Post,
  UnauthorizedError,
  HeaderParam,
  BadRequestError,
} from 'routing-controllers'
import {
  generateAndPersistRefreshToken,
  decodeJwt,
  generateAccessToken,
} from '../services/AuthHelper'

@JsonController()
export class AuthController {
  @Post('/login')
  async login(
    @BodyParam('email', { required: true }) email: string,
    @BodyParam('password', { required: true }) password: string,
  ) {
    // check if user exists
    const userRepo = getRepository(User)
    const user = await userRepo.findOne({ where: { email } })
    if (!user) throw new NotFoundError('User not found')

    // validate password
    const isPasswordValid = await user.verifyPassword(password)
    if (!isPasswordValid) {
      throw new UnauthorizedError('Incorrect password')
    }

    // generate access token
    const accessToken = await generateAccessToken({
      userId: user.getId(),
      audience: 'app',
    })

    // generate refresh token
    const refreshToken = await generateAndPersistRefreshToken({
      userId: user.getId(),
      accessTokenAudience: 'app',
    })

    // TODO: for web login, set httponly for refresh token
    // see https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/
    return { user: user.get(), accessToken, refreshToken }
  }

  @Post('/refresh-token')
  async refreshToken(@HeaderParam('refreshtoken') refreshToken: string) {
    if (!refreshToken) throw new BadRequestError('refresh token not found')

    const decodedToken = await decodeJwt(refreshToken)
    if (!decodedToken) throw new UnauthorizedError('invalid refresh token')

    // Make sure token exists in db
    const tokenRepo = getRepository(RefreshToken)
    const tokenEntity = await tokenRepo.findOne(decodedToken.jti)
    if (!tokenEntity) throw new UnauthorizedError('invalid refresh token')

    // make sure token has not been used already
    const { isUsed, userId, aud } = tokenEntity.get()
    if (isUsed === true)
      throw new UnauthorizedError('refresh token has expired')

    // set refresh token to used
    tokenEntity.setIsUsed()
    tokenRepo.save(tokenEntity)

    // generate new accessToken
    const newAccessToken = generateAccessToken({ userId, audience: aud })

    // generate new refreshToken
    const newRefreshToken = await generateAndPersistRefreshToken({
      userId,
      accessTokenAudience: aud,
    })

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }
}
