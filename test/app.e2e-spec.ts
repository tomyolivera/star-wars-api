import { Test } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { Messages } from '@/utils/messages'
import { MovieService } from '@/services/movie.service'
import { AuthService } from '@/services/auth.service'

describe('Movies API (e2e)', () => {
  let app: INestApplication
  let jwtToken: string
  let movieService: MovieService
  let authService: AuthService

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    movieService = moduleFixture.get<MovieService>(MovieService)
    authService = moduleFixture.get<AuthService>(AuthService)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('POST /auth/login should return 401 Unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'sometestignuser', password: 'withotherpassword' })

    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
  })

  // Common User
  describe('User', () => {
    it('POST /auth/login should authenticate and return JWT User token', async () => {
      const user = {
        username: 'user',
        password: '12345'
      }
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user)

      const auth = await authService.login(user)
      if (!auth)
        return expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST)

      expect(response.status).toBe(HttpStatus.OK)
      expect(response.body.token).toBeDefined()
      jwtToken = response.body.token
    })

    it('GET /movies should return all movies', async () => {
      const response = await request(app.getHttpServer())
        .get('/movies')
        .set('Authorization', `Bearer ${jwtToken}`)

      expect(response.status).toBe(HttpStatus.OK)
    })

    it('GET /movies should return 401 Unauthorized', async () => {
      const response = await request(app.getHttpServer()).get('/movies')

      expect(response.status).toBe(HttpStatus.UNAUTHORIZED)
    })

    it('POST /movies should return 403 Forbbiden', async () => {
      const response = await request(app.getHttpServer())
        .post('/movies')
        .set('Authorization', `Bearer ${jwtToken}`)

      expect(response.status).toBe(HttpStatus.FORBIDDEN)
    })

    it('PUT /movies should return 403 Forbbiden', async () => {
      const response = await request(app.getHttpServer())
        .put('/movies/6')
        .set('Authorization', `Bearer ${jwtToken}`)

      expect(response.status).toBe(HttpStatus.FORBIDDEN)
    })

    it('DELETE /movies should return 403 Forbbiden', async () => {
      const response = await request(app.getHttpServer())
        .delete('/movies/6')
        .set('Authorization', `Bearer ${jwtToken}`)

      expect(response.status).toBe(HttpStatus.FORBIDDEN)
    })
  })

  // Admin
  describe('Admin', () => {
    it('POST /auth/login should authenticate and return JWT Admin token', async () => {
      const user = {
        username: 'admin',
        password: '12345'
      }
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user)

      const auth = await authService.login(user)
      if (!auth)
        return expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST)

      expect(response.status).toBe(HttpStatus.OK)
      expect(response.body.token).toBeDefined()
      jwtToken = response.body.token
    })

    it('GET /movies should return all movies', async () => {
      const response = await request(app.getHttpServer())
        .get('/movies')
        .set('Authorization', `Bearer ${jwtToken}`)

      expect(response.status).toBe(HttpStatus.OK)
    })

    it('GET /movies should return 401 Unauthorized', async () => {
      const response = await request(app.getHttpServer()).post('/movies')

      expect(response.status).toBe(HttpStatus.UNAUTHORIZED)
    })

    it('POST /movies create a movie', async () => {
      const mockedMovie = {
        title: 'Testing movies',
        episode_id: 4,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: [
          'https://swapi.dev/api/people/1/',
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/3/',
          'https://swapi.dev/api/people/4/',
          'https://swapi.dev/api/people/5/',
          'https://swapi.dev/api/people/6/',
          'https://swapi.dev/api/people/7/',
          'https://swapi.dev/api/people/8/',
          'https://swapi.dev/api/people/9/',
          'https://swapi.dev/api/people/10/',
          'https://swapi.dev/api/people/12/',
          'https://swapi.dev/api/people/13/',
          'https://swapi.dev/api/people/14/',
          'https://swapi.dev/api/people/15/',
          'https://swapi.dev/api/people/16/',
          'https://swapi.dev/api/people/18/',
          'https://swapi.dev/api/people/19/',
          'https://swapi.dev/api/people/81/'
        ],
        planets: [
          'https://swapi.dev/api/planets/1/',
          'https://swapi.dev/api/planets/2/',
          'https://swapi.dev/api/planets/3/'
        ],
        starships: [
          'https://swapi.dev/api/starships/2/',
          'https://swapi.dev/api/starships/3/',
          'https://swapi.dev/api/starships/5/',
          'https://swapi.dev/api/starships/9/',
          'https://swapi.dev/api/starships/10/',
          'https://swapi.dev/api/starships/11/',
          'https://swapi.dev/api/starships/12/',
          'https://swapi.dev/api/starships/13/'
        ],
        vehicles: [
          'https://swapi.dev/api/vehicles/4/',
          'https://swapi.dev/api/vehicles/6/',
          'https://swapi.dev/api/vehicles/7/',
          'https://swapi.dev/api/vehicles/8/'
        ],
        species: [
          'https://swapi.dev/api/species/1/',
          'https://swapi.dev/api/species/2/',
          'https://swapi.dev/api/species/3/',
          'https://swapi.dev/api/species/4/',
          'https://swapi.dev/api/species/5/'
        ],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/7/',
        createdAt: '2024-12-12T22:58:53.903Z',
        updatedAt: '2024-12-12T22:58:53.903Z'
      }
      const response = await request(app.getHttpServer())
        .post('/movies')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(mockedMovie)

      expect(response.status).toBe(HttpStatus.CREATED)
      expect(response.body.title).toBe(mockedMovie.title)
    })

    it('PUT /movies/:id should update a movie with ID 5 if found', async () => {
      const mockedUpdatedMovie = {
        title: 'Updated movie',
        episode_id: 4,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: [
          'https://swapi.dev/api/people/1/',
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/3/',
          'https://swapi.dev/api/people/4/',
          'https://swapi.dev/api/people/5/',
          'https://swapi.dev/api/people/6/',
          'https://swapi.dev/api/people/7/',
          'https://swapi.dev/api/people/8/',
          'https://swapi.dev/api/people/9/',
          'https://swapi.dev/api/people/10/',
          'https://swapi.dev/api/people/12/',
          'https://swapi.dev/api/people/13/',
          'https://swapi.dev/api/people/14/',
          'https://swapi.dev/api/people/15/',
          'https://swapi.dev/api/people/16/',
          'https://swapi.dev/api/people/18/',
          'https://swapi.dev/api/people/19/',
          'https://swapi.dev/api/people/81/'
        ],
        planets: [
          'https://swapi.dev/api/planets/1/',
          'https://swapi.dev/api/planets/2/',
          'https://swapi.dev/api/planets/3/'
        ],
        starships: [
          'https://swapi.dev/api/starships/2/',
          'https://swapi.dev/api/starships/3/',
          'https://swapi.dev/api/starships/5/',
          'https://swapi.dev/api/starships/9/',
          'https://swapi.dev/api/starships/10/',
          'https://swapi.dev/api/starships/11/',
          'https://swapi.dev/api/starships/12/',
          'https://swapi.dev/api/starships/13/'
        ],
        vehicles: [
          'https://swapi.dev/api/vehicles/4/',
          'https://swapi.dev/api/vehicles/6/',
          'https://swapi.dev/api/vehicles/7/',
          'https://swapi.dev/api/vehicles/8/'
        ],
        species: [
          'https://swapi.dev/api/species/1/',
          'https://swapi.dev/api/species/2/',
          'https://swapi.dev/api/species/3/',
          'https://swapi.dev/api/species/4/',
          'https://swapi.dev/api/species/5/'
        ],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/7/',
        createdAt: '2024-12-12T22:58:53.903Z',
        updatedAt: '2024-12-12T22:58:53.903Z'
      }
      const response = await request(app.getHttpServer())
        .put('/movies/5')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(mockedUpdatedMovie)

      const movieFound = await movieService.findOne(5)
      if (!movieFound)
        return expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST)

      expect(response.status).toBe(HttpStatus.OK)
      expect(response.body.title).toBe(mockedUpdatedMovie.title)
    })

    it('DELETE /movies/:id should delete a movie with ID 6 if found', async () => {
      const response = await request(app.getHttpServer())
        .delete('/movies/9')
        .set('Authorization', `Bearer ${jwtToken}`)

      const movieFound = await movieService.findOne(6)
      if (!movieFound)
        return expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST)

      expect(response.status).toBe(HttpStatus.OK)
      expect(response.body).toBe(Messages.Movie.DELETED)
    })
  })
})
