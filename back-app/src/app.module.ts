import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReactSpaModule } from '../bootstrap/spa-config/serve-static.module';

@Module({})
export class AppModule {

  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      providers: [AppService],
      controllers: [AppController],
      imports: [ReactSpaModule.forRoot()],
    };
  }
}
