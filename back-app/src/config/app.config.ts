import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '4500', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  maintenance: process.env.MAINTENANCE === 'true',
}));
