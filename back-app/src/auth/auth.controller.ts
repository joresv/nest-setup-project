import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import type { SessionData } from 'express-session';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CurrentSession } from '../decorators/session.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() dto: LoginDto,
    @CurrentSession() session: SessionData,
  ): { userId: string } {
    const userId = this.authService.validate(dto.username, dto.password);
    session.userId = userId;
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
