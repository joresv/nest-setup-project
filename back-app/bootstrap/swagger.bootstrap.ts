import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerBootstrap {
  constructor(
    private readonly app: NestExpressApplication,
    private readonly config: ConfigService,
  ) {}

  configure(): void {
    if (this.config.get('NODE_ENV') === 'production') return;

    const config = new DocumentBuilder()
      .setTitle('Nest Setup Example')
      .setDescription('The nest-setup API description')
      .setVersion('1.0')
      .addTag('nest-setup')
      .build();

    SwaggerModule.setup(
      'api-docs',
      this.app,
      () => SwaggerModule.createDocument(this.app, config),
    );
  }
}
