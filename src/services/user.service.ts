import { FindOneOptionsUser, User } from '@/schemas/user.schema'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '@/types/jwt.types'
import EnvVars from '@/config/vars'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne({
    column,
    withPassword = false
  }: FindOneOptionsUser): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ username: column }, { token: column }]
    })

    if (!user) return null
    if (!withPassword) user.password = null

    return user
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user)
  }

  update(user: User): Promise<UpdateResult> {
    return this.usersRepository.update(user.id, user)
  }

  async generateTokens(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role
    }

    const token = this.jwtService.sign(payload)
    user.token = token
    user.tokenExp = new Date(
      Date.now() + 1000 * 60 * 60 * EnvVars.JWT_EXPIRATION_TIME
    ) // Hours

    await this.update(user)

    return token
  }
}
