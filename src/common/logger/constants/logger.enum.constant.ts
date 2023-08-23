import { ENUM_REQUEST_METHOD } from '../../request/constants/request.enum.constant';

export enum ENUM_LOGGER_LEVEL {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  FATAL = 'FATAL',
}

export enum ENUM_LOGGER_ACTION {
  LOGIN = 'LOGIN',
  TEST = 'TEST',
}

export const ENUM_LOGGER_METHOD = {
  ...ENUM_REQUEST_METHOD,
};

export type ENUM_LOGGER_METHOD = ENUM_REQUEST_METHOD;
