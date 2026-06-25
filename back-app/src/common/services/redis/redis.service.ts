import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Redis } from 'ioredis';
import { redisConfig } from '@/config/redis.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class RedisService extends Redis implements OnApplicationShutdown {
  constructor() {
    super(redisConfig());
  }

  async onApplicationShutdown(): Promise<void> {
    await this.quit();
  }
}
