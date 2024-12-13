import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { Movie } from '@/schemas/movie.schema'
import axios from 'axios'

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>
  ) {}

  async getMoviesFromAPI() {
    try {
      const response = await axios.get('https://swapi.dev/api/films')
      const movies = response.data.results
      return movies
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async seed() {
    const movies = await this.getMoviesFromAPI()
    await this.moviesRepository.save(movies)
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find()
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOneBy({ id })
  }

  create(movie: Movie): Promise<Movie> {
    return this.moviesRepository.save({ ...movie, id: null })
  }

  async update(movie: Movie): Promise<Movie> {
    await this.moviesRepository.update(movie.id, movie)
    return movie
  }

  delete(id: number): Promise<DeleteResult> {
    return this.moviesRepository.delete(id)
  }
}
