import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { swaggerInit } from './swagger';
import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.env');
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioningPrefix: string = configService.get<string>('app.versioning.prefix');
  const version: string = configService.get<string>('app.versioning.version');

  // enable
  const httpEnable: boolean = configService.get<boolean>('app.http.enable');
  const versionEnable: string = configService.get<string>('app.versioning.enable');

  const logger = new Logger();
  process.env.NODE_ENV = env;

  // Global
  app.setGlobalPrefix(globalPrefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Versioning
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }
  // Swagger
  process.env.NODE_ENV !== 'production' && (await swaggerInit(app));

  // Listen
  await app.listen(port, host);

  logger.log(`==========================================================`);

  logger.log(`Environment Variable`, 'NestApplication');
  logger.log({ ...process.env }, 'NestApplication');

  logger.log(`==========================================================`);

  logger.log(`Http is ${httpEnable}, ${httpEnable ? 'routes registered' : 'no routes registered'}`, 'NestApplication');
  logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');

  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');

  logger.log(`==========================================================`);
}
bootstrap();
