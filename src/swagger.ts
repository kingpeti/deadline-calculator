import { Logger } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { writeFileSync } from 'fs';

export const swaggerInit = async (app: NestApplication) => {
  const logger = new Logger();

  const docName = 'NestJS DeadlineCalculator';
  const docPrefix = 'docs';

  const documentBuild = new DocumentBuilder()
    .setTitle('NestJS DeadlineCalculator')
    .setDescription('NestJS DeadlineCalculator API')
    .setVersion('1.0.0')
    .addServer('/')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuild, {
    deepScanRoutes: true,
  });

  writeFileSync('./swagger.json', JSON.stringify(document));
  const theme = new SwaggerTheme('v3');
  SwaggerModule.setup(docPrefix, app, document, {
    jsonDocumentUrl: `${docPrefix}/json`,
    yamlDocumentUrl: `${docPrefix}/yaml`,
    explorer: false,
    customSiteTitle: docName,
    customCss: theme.getBuffer('dark'),
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
      displayOperationId: true,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      tryItOutEnabled: true,
      filter: true,
      deepLinking: true,
      syntaxHighlight: {
        activate: true,
        theme: 'tomorrow-night',
      },
    },
  });

  logger.log(`==========================================================`);

  logger.log(`Docs will serve on ${docPrefix}`, 'NestApplication');

  logger.log(`==========================================================`);
};
