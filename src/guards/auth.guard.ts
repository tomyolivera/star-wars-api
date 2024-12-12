import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import EnvVars from '@/config/vars'
import { UserService } from '@/services/user.service'
import { JwtPayload } from '@/types/jwt.types'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '@/decorators/auth.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException()

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: EnvVars.JWT_SECRET
      })

      if (!payload) throw new UnauthorizedException()

      const user = await this.userService.findOne({column: token})

      if (!user || (user && user.tokenExp < new Date(Date.now())))
        throw new UnauthorizedException()

      request.user = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
