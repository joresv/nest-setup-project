import { DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({})
export class ReactSpaModule {
  static forRoot(): DynamicModule {
    const isMaintenance = process.env.MAINTENANCE === 'true';
    const rootPath = isMaintenance
      ? join(__dirname, '..', '..', 'public', 'maintenance')
      : join(__dirname, '..', '..', 'public', 'build');

    return {
      module: ReactSpaModule,
      imports: [
        NestServeStaticModule.forRoot({
          rootPath,
          exclude: ['/api/*path'],
        }),
      ],
    };
  }
}
