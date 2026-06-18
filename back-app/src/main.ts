import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { CsrfService } from './csrf/csrf.service';
import { MiddlewareBootstrap } from '../bootstrap/middleware.bootstrap';
import { SessionBootstrap } from '../bootstrap/session.bootstrap';
import { SwaggerBootstrap } from '../bootstrap/swagger.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule.forRoot());
  const config = app.get(ConfigService);

  new MiddlewareBootstrap(app, config).configure();

  const sessionBootstrap = new SessionBootstrap(app, config);
  sessionBootstrap.configure();
  app.get(CsrfService).init(sessionBootstrap.generateCsrfToken);

  new SwaggerBootstrap(app, config).configure();

  app.setGlobalPrefix('api');

  await app.listen(config.get('PORT') ?? 4500);
}
bootstrap();
