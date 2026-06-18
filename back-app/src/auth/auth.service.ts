import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly config: ConfigService) {}

  // Remplacer par une vraie validation DB
  validate(username: string, password: string): string {
    const validUsername = this.config.getOrThrow<string>('AUTH_USERNAME');
    const validPassword = this.config.getOrThrow<string>('AUTH_PASSWORD');

    if (username !== validUsername || password !== validPassword) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    return username;
  }
}
