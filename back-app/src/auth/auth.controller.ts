import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
  ): Promise<{ userId: string }> {
    const userId = this.authService.validate(dto.username, dto.password);

    // Régénère l'ID de session pour prévenir la fixation de session
    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });

    req.session.userId = userId;
    req.session.createdAt = new Date().toISOString();

    return { userId };
  }

  @Post('logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });
    return { message: 'logged out' };
  }
}
