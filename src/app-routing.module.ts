import { Module } from '@nestjs/common'
import { RouterModule, Routes } from '@nestjs/core'
import { AuthModule } from './modules/auth.module'
import { MovieModule } from './modules/movie.module'

const ROUTES: Routes = [
  {
    path: 'auth',
    module: AuthModule
  },
  {
    path: 'movies',
    module: MovieModule
  }
]

@Module({
  imports: [RouterModule.register(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
