import { Roles } from '@/decorators/roles.decorator'
import { RolesGuard } from '@/guards/roles.guard'
import { Movie } from '@/schemas/movie.schema'
import { MovieService } from '@/services/movie.service'
import { UserRole } from '@/types/user-role.types'
import { Messages } from '@/utils/messages'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards
} from '@nestjs/common'
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'

@UseGuards(RolesGuard)
@ApiTags('movies')
@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Seed the database with movies' })
  @Get('seed')
  async seed(@Res() res: Response) {
    const response = await this.movieService.seed()
    return res.status(HttpStatus.OK).json(response)
  }

  @ApiOperation({ summary: 'Get all movies from the database' })
  @ApiOkResponse({ type: [Movie] })
  @Get()
  async getAllMovies(@Res() res: Response) {
    const movies = await this.movieService.findAll()
    return res.status(HttpStatus.OK).json(movies)
  }

  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiOkResponse({ type: Movie })
  @Get(':id')
  async getMovieById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const movie = await this.movieService.findOne(id)
    if (!movie) throw new BadRequestException(Messages.Movie.NOT_FOUND)
    return res.status(HttpStatus.OK).json(movie)
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a movie' })
  @ApiBody({ type: Movie })
  @ApiOkResponse({ type: Movie })
  @Post()
  async create(@Body() movie: Movie, @Res() res: Response) {
    const newMovie = await this.movieService.create(movie)
    return res.status(HttpStatus.CREATED).json(newMovie)
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: Movie })
  @ApiOkResponse({ type: Movie })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() movie: Movie,
    @Res() res: Response
  ) {
    const foundMovie = await this.movieService.findOne(id)
    if (!foundMovie) throw new BadRequestException(Messages.Movie.NOT_FOUND)

    const updatedMovie = await this.movieService.update({ ...movie, id })
    return res.status(HttpStatus.OK).json(updatedMovie)
  }

  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: Messages.Movie.DELETED })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const foundMovie = await this.movieService.findOne(id)
    if (!foundMovie) throw new BadRequestException(Messages.Movie.NOT_FOUND)

    await this.movieService.delete(id)
    return res.status(HttpStatus.OK).json(Messages.Movie.DELETED)
  }
}
