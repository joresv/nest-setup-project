import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsrfService } from './csrf/csrf.service';
import { ReactSpaModule } from '../bootstrap/spa-config/serve-static.module';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      providers: [AppService, CsrfService],
      controllers: [AppController],
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ReactSpaModule.forRoot(),
      ],
    };
  }
}
