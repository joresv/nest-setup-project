import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import { doubleCsrf, CsrfTokenGenerator, DoubleCsrfProtection } from 'csrf-csrf';
import { SessionConfig } from './session-config/session.config';

export class SessionBootstrap {
  readonly generateCsrfToken: CsrfTokenGenerator;
  private readonly protection: DoubleCsrfProtection;

  constructor(
    private readonly app: NestExpressApplication,
    private readonly config: ConfigService,
  ) {
    const isProd = config.get('NODE_ENV') === 'production';
    const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
      getSecret: () => config.getOrThrow<string>('CSRF_SECRET'),
      getSessionIdentifier: (req) => req.session.id,
      cookieName: config.getOrThrow<string>('COOKIE_NAME'),
      cookieOptions: { secure: isProd, httpOnly: true, sameSite: 'lax' },
    });

    this.protection = doubleCsrfProtection;
    this.generateCsrfToken = generateCsrfToken;
  }

  configure(): void {
    this.app.use(session(new SessionConfig(this.config).build()));
    this.app.use(this.protection);
  }
}
