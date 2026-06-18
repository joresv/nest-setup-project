import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule.forRoot());

  app.use(compression());
  app.enableCors();

   app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Nest Setup Example')
    .setDescription('The nest-setup API description')
    .setVersion('1.0')
    .addTag('nest-setup')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

 

  await app.listen(process.env.PORT ?? 4500);
}
bootstrap();
