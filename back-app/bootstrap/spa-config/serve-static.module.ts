import { DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import { ConfigType } from '@nestjs/config';
import { join } from 'path';
import { appConfig } from '@/config/app.config';

@Module({})
export class ReactSpaModule {
  static forRoot(): DynamicModule {
    return {
      module: ReactSpaModule,
      imports: [
        NestServeStaticModule.forRootAsync({
          useFactory: (config: ConfigType<typeof appConfig>) => [{
            rootPath: config.maintenance
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
