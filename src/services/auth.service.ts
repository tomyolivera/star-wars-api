import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { Messages } from '@/utils/messages'
import { AuthDTO, User, UserDTO } from '@/schemas/user.schema'
import { comparePassword, hashPassword } from '@/utils/hash'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login({ username, password }: AuthDTO) {
    const user = await this.userService.findOne({
      column: username,
      withPassword: true
    })

    const isPasswordValid = await comparePassword(password, user?.password)

    if (!isPasswordValid || !user)
      throw new HttpException(
        Messages.User.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED
      )

    // If token is expired, generate a new one, otherwise return the current one
    return user.tokenExp < new Date()
      ? await this.userService.generateTokens(user)
      : user.token
  }

  async register(user: UserDTO): Promise<User> {
    const hashedPassword = await hashPassword(user.password)

    const userCreated = await this.userService.create({
      id: null,
      username: user.username,
      password: hashedPassword,
      role: user.role,
      token: null,
      tokenExp: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return { ...userCreated, password: null }
  }
}
