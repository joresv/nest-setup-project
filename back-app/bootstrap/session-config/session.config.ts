import { ConfigService } from '@nestjs/config';
import { SessionOptions } from 'express-session';
import './session.types';

export class SessionConfig {
  constructor(private readonly config: ConfigService) {}

  build(): SessionOptions {
    return {
      name: this.config.getOrThrow<string>('SESSION_COOKIE_NAME'),
      secret: this.config.getOrThrow<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: this.config.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
      },
    };
  }
}
