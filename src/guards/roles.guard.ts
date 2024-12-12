import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@/decorators/roles.decorator'
import { UserRoleValue } from '@/types/user-role.types'
import { IS_PUBLIC_KEY } from '@/decorators/auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }

    const requiredRoleValues = this.reflector.getAllAndOverride<
      UserRoleValue[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()])
    if (!requiredRoleValues) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    return requiredRoleValues.some((role) => user.role === role)
  }
}
