import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Movie } from '@/schemas/movie.schema'
import { MovieService } from '@/services/movie.service'
import { MovieController } from '@/controllers/movie.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
