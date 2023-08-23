import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ENUM_LOGGER_LEVEL } from 'src/common/logger/constants/logger.enum.constant';
import { LoggerCreateDto, LoggerCreateRawDto } from 'src/common/logger/dtos/logger.create.dto';
import { ILoggerService } from 'src/common/logger/interfaces/logger.service.interface';

@Injectable()
export class LoggerService implements ILoggerService {
  constructor(private readonly consoleLogger: ConsoleLogger) {}

  async info({
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void> {
    const create: LoggerCreateRawDto = new LoggerCreateRawDto();
    create.level = ENUM_LOGGER_LEVEL.INFO;

    create.anonymous = true;
    create.action = action;
    create.description = description;
    create.method = method;
    create.requestId = requestId;
    create.params = params;
    create.bodies = bodies;
    create.path = path;
    create.statusCode = statusCode;
    create.tags = tags;

    return this.consoleLogger.log(create);
  }

  async debug({
    anonymous,
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void> {
    const create: LoggerCreateRawDto = new LoggerCreateRawDto();
    create.level = ENUM_LOGGER_LEVEL.DEBUG;

    create.anonymous = anonymous;
    create.action = action;
    create.description = description;
    create.method = method;
    create.requestId = requestId;
    create.params = params;
    create.bodies = bodies;
    create.path = path;
    create.statusCode = statusCode;
    create.tags = tags;

    return this.consoleLogger.debug(create);
  }

  async warn({
    anonymous,
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void> {
    const create: LoggerCreateRawDto = new LoggerCreateRawDto();
    create.level = ENUM_LOGGER_LEVEL.WARN;

    create.anonymous = anonymous;
    create.action = action;
    create.description = description;
    create.method = method;
    create.requestId = requestId;
    create.params = params;
    create.bodies = bodies;
    create.path = path;
    create.statusCode = statusCode;
    create.tags = tags;

    return this.consoleLogger.warn(create);
  }

  async fatal({
    anonymous,
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void> {
    const create: LoggerCreateRawDto = new LoggerCreateRawDto();
    create.level = ENUM_LOGGER_LEVEL.FATAL;

    create.anonymous = anonymous;
    create.action = action;
    create.description = description;
    create.method = method;
    create.requestId = requestId;
    create.params = params;
    create.bodies = bodies;
    create.path = path;
    create.statusCode = statusCode;
    create.tags = tags;

    return this.consoleLogger.fatal(create);
  }

  async raw({
    anonymous,
    level,
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateRawDto): Promise<void> {
    const create: LoggerCreateRawDto = new LoggerCreateRawDto();
    create.level = level;

    create.anonymous = anonymous;
    create.action = action;
    create.description = description;
    create.method = method;
    create.requestId = requestId;
    create.params = params;
    create.bodies = bodies;
    create.path = path;
    create.statusCode = statusCode;
    create.tags = tags;

    return this.consoleLogger.verbose(create);
  }
}
