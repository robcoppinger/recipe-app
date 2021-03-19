import { User } from '../entities/User'
import { Get, JsonController, NotFoundError } from 'routing-controllers'
import { getRepository } from 'typeorm'

@JsonController()
export class AppController {
  @Get('/')
  async index() {
    const userRepo = getRepository(User)

    const user = await userRepo.findOne({
      where: { email: 'coppinger.robert@gmail.com' },
    })

    if (!user) throw new NotFoundError('User not found')

    return user
  }
}
