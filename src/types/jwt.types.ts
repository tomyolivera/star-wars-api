import { UserRole } from '@/types/user-role.types'

export type JwtPayload = {
  id: number
  username: string
  role: UserRole
}
