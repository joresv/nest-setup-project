import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import cookieParser from 'cookie-parser';

export class MiddlewareBootstrap {
  constructor(
    private readonly app: NestExpressApplication,
    private readonly config: ConfigService,
  ) {}

  configure(): void {
    this.app.use(compression());
    this.app.use(cookieParser(this.config.getOrThrow<string>('COOKIE_SECRET')));
    this.app.enableCors();
  }
}
