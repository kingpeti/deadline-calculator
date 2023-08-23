import {
  ENUM_LOGGER_ACTION,
  ENUM_LOGGER_LEVEL,
  ENUM_LOGGER_METHOD,
} from 'src/common/logger/constants/logger.enum.constant';

export class LoggerCreateDto {
  anonymous: boolean;
  action: ENUM_LOGGER_ACTION;
  description: string;
  requestId?: string;
  method: ENUM_LOGGER_METHOD;
  path: string;
  tags?: string[];
  params?: Record<string, any>;
  bodies?: Record<string, any>;
  statusCode?: number;
}

export class LoggerCreateRawDto extends LoggerCreateDto {
  level: ENUM_LOGGER_LEVEL;
}
