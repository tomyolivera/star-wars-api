import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import EnvVars from '@/config/vars'
import { User } from '@/schemas/user.schema'
import { Movie } from '@/schemas/movie.schema'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: EnvVars.DB_HOST || 'localhost',
      port: EnvVars.DB_PORT || 5432,
      username: EnvVars.DB_USER || 'root',
      password: EnvVars.DB_PASSWORD || 'password',
      database: EnvVars.DB_NAME || 'movies',
      entities: [User, Movie],
      synchronize: true
    })
  ]
})
export class DBModule {}
