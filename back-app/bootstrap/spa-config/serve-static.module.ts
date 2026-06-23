import { appConfig } from '@/config/app.config';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({})
export class ReactSpaModule {
  static forRoot(): DynamicModule {
    const isDev = process.env.NODE_ENV !== 'production';
    const isMaintenance = process.env.MAINTENANCE === 'true';

    if (isDev && !isMaintenance) {
      return { module: ReactSpaModule };
    }

    return {
      module: ReactSpaModule,
      imports: [
        NestServeStaticModule.forRootAsync({
          useFactory: (config: ConfigType<typeof appConfig>) => [{
            rootPath: config.isMaintenance
              ? join(__dirname, '..', '..', 'public', 'maintenance')
              : join(__dirname, '..', '..', 'public', 'build'),
            exclude: ['/api/*path'],
          }],
          inject: [appConfig.KEY],
        }),
      ],
    };
  }
}
