import { LoggerCreateDto, LoggerCreateRawDto } from 'src/common/logger/dtos/logger.create.dto';

export interface ILoggerService {
  info({
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void>;
  debug({
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void>;
  warn({
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void>;
  fatal({
    action,
    description,
    method,
    requestId,
    params,
    bodies,
    path,
    statusCode,
    tags,
  }: LoggerCreateDto): Promise<void>;
  raw({
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
  }: LoggerCreateRawDto): Promise<void>;
}
