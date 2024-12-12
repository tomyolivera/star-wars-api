import { Module } from '@nestjs/common'
import { DBModule } from './modules/db.module'
import { UserModule } from './modules/user.module'
import { MovieModule } from './modules/movie.module'
import { AuthModule } from './modules/auth.module'
import { AuthGuard } from './guards/auth.guard'
import { AppRoutingModule } from './app-routing.module'

@Module({
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
  imports: [DBModule, UserModule, MovieModule, AuthModule, AppRoutingModule]
})
export class AppModule {}
