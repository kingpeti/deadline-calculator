import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_LANGUAGE } from 'src/app/constants/app.constant';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';
import { DebuggerModule } from 'src/common/debugger/debugger.module';
import { ErrorModule } from 'src/common/error/error.module';
import { HelperModule } from 'src/common/helper/helper.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { RequestModule } from 'src/common/request/request.module';
import { ResponseModule } from 'src/common/response/response.module';
import configs from 'src/configs';
import { ENUM_MESSAGE_LANGUAGE } from './message/constants/message.enum.constant';
import * as Joi from 'joi';
import { MessageModule } from './message/message.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string()
          .valid(...Object.values(ENUM_APP_ENVIRONMENT))
          .default('development')
          .required(),
        APP_LANGUAGE: Joi.string()
          .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
          .default(APP_LANGUAGE)
          .required(),

        HTTP_ENABLE: Joi.boolean().default(true).required(),
        HTTP_HOST: [Joi.string().ip({ version: 'ipv4' }).required(), Joi.valid('localhost').required()],
        HTTP_PORT: Joi.number().default(3000).required(),
        HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
        HTTP_VERSION: Joi.number().required(),

        DEBUGGER_HTTP_WRITE_INTO_FILE: Joi.boolean().default(false).required(),
        DEBUGGER_HTTP_WRITE_INTO_CONSOLE: Joi.boolean().default(false).required(),
        DEBUGGER_SYSTEM_WRITE_INTO_FILE: Joi.boolean().default(false).required(),
        DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE: Joi.boolean().default(false).required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MessageModule,
    HelperModule,
    ErrorModule,
    DebuggerModule.forRoot(),
    ResponseModule,
    RequestModule,
    LoggerModule,
  ],
})
export class CommonModule {}
