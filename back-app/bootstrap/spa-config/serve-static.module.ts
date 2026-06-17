
import { DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({})
export class ReactSpaModule {
  static forRoot(): DynamicModule {
    return {
      module: ReactSpaModule,
      imports: [
        NestServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', '..', 'public'), 
          exclude: ['/api/*path'], 
        }),
      ],
    };
  }
}