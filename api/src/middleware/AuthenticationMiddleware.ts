import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { getRepository } from 'typeorm'
import { User } from '../entities/User'
import { decodeJwt } from '../services/AuthHelper'

function extractTokenFromRequest(request: any) {
  const token = request.headers.authorization
  if (!token) return null

  if (token.startsWith('Bearer ')) {
    // remove Bearer from token
    return token.slice(7, token.length)
  }

  return token
}

@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err: any) => any): void {
    const token = extractTokenFromRequest(request)
    if (!token) return next(null)

    decodeJwt(token)
      .then((decoded) => {
        if (!decoded) return next(null)
        if (!['web', 'app'].includes(decoded.aud)) return next(null)

        const userRepo = getRepository(User)
        userRepo.findOne({ where: { id: decoded.userId } }).then((user) => {
          request.user = user.get()
          return next(null)
        })
      })
      .catch((e) => {
        next(null)
      })
  }
}
