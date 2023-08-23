import { HttpStatus, Module, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RequestTimeoutInterceptor } from 'src/common/request/interceptors/request.timeout.interceptor';
import { RequestMiddlewareModule } from 'src/common/request/middleware/request.middleware.module';
import { MaxDateTodayConstraint } from 'src/common/request/validations/request.max-date-today.validation';
import { MinDateTodayConstraint } from 'src/common/request/validations/request.min-date-today.validation';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from './constants/request.status-code.constant';
import { IsStartWithConstraint } from './validations/request.is-start-with.validation';
import { MaxGreaterThanEqualConstraint } from './validations/request.max-greater-than-equal.validation';
import { MaxGreaterThanConstraint } from './validations/request.max-greater-than.validation';
import { MinGreaterThanEqualConstraint } from './validations/request.min-greater-than-equal.validation';
import { MinGreaterThanConstraint } from './validations/request.min-greater-than.validation';
import { IsOnlyDigitsConstraint } from './validations/request.only-digits.validation';
import { SafeStringConstraint } from './validations/request.safe-string.validation';
import { SkipConstraint } from './validations/request.skip.validation';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestTimeoutInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          skipNullProperties: false,
          skipUndefinedProperties: false,
          skipMissingProperties: false,
          forbidUnknownValues: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          exceptionFactory: async (errors: ValidationError[]) =>
            new UnprocessableEntityException({
              statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
              message: 'request.validation',
              errors,
            }),
        }),
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    IsStartWithConstraint,
    MaxGreaterThanEqualConstraint,
    MaxGreaterThanConstraint,
    MinGreaterThanEqualConstraint,
    MinGreaterThanConstraint,
    SkipConstraint,
    SafeStringConstraint,
    IsOnlyDigitsConstraint,
    MinDateTodayConstraint,
    MaxDateTodayConstraint,
  ],
  imports: [
    RequestMiddlewareModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('request.throttle.ttl'),
        limit: config.get('request.throttle.limit'),
      }),
    }),
  ],
})
export class RequestModule {}