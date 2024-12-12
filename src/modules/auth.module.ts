import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import EnvVars from '@/config/vars'
import { AuthController } from '@/controllers/auth.controller'
import { User } from '@/schemas/user.schema'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
import { DBModule } from '@/modules/db.module'

@Module({
  imports: [
    DBModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: EnvVars.JWT_SECRET,
      signOptions: {
        expiresIn: EnvVars.JWT_EXPIRATION_TIME * 1000 * 60 * 60 // Hours
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
