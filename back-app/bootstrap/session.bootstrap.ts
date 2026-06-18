import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { doubleCsrf, CsrfTokenGenerator } from 'csrf-csrf';
import { SessionConfig } from './session-config/session.config';

export class SessionBootstrap {
  readonly generateCsrfToken: CsrfTokenGenerator;
  private readonly validateRequest: (req: Request) => boolean;
  private readonly invalidCsrfTokenError: Error;

  constructor(
    private readonly app: NestExpressApplication,
    private readonly config: ConfigService,
  ) {
    const isProd = config.get('NODE_ENV') === 'production';
    const { invalidCsrfTokenError, validateRequest, generateCsrfToken } = doubleCsrf({
      getSecret: () => config.getOrThrow<string>('CSRF_SECRET'),
      getSessionIdentifier: (req) => req.session.id,
      cookieName: config.getOrThrow<string>('COOKIE_NAME'),
      cookieOptions: { secure: isProd, httpOnly: true, sameSite: 'lax' },
    });

    this.validateRequest = validateRequest;
    this.invalidCsrfTokenError = invalidCsrfTokenError;
    this.generateCsrfToken = generateCsrfToken;
  }

  configure(): void {
    this.app.use(session(new SessionConfig(this.config).build()));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (!this.validateRequest(req)) {
        res.status(403).json({ statusCode: 403, message: this.invalidCsrfTokenError.message });
      }
      next();
    });
  }
}
