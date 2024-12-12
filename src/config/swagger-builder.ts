import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const DOC_PATH = 'docs';

export default (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Star Wars Movies API')
    .setDescription('Documentation for developers.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOC_PATH, app, document);
};
