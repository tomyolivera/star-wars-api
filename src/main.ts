import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import EnvVars from './config/vars'
import swaggerBuilder from './config/swagger-builder'
import { HttpExceptionsFilter } from './http-exception-filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configs
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionsFilter())
  app.setGlobalPrefix('api')
  swaggerBuilder(app)

  await app.listen(EnvVars.PORT || 5000)
}
bootstrap()
