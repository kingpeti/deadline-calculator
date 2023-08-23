import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';

export interface IDocOptions {
  operation?: string;
  deprecated?: boolean;
  description?: string;
}

export interface IDocOfOptions {
  statusCode: number;
  messagePath: string;
  serialization?: ClassConstructor<any>;
}

export interface IDocDefaultOptions extends IDocOfOptions {
  httpStatus: HttpStatus;
}

export interface IDocAuthOptions {
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
  apiKey?: boolean;
}

export interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
}

export interface IDocGuardOptions {
  userAgent?: boolean;
  timestamp?: boolean;
  role?: boolean;
  policy?: boolean;
}

export interface IDocResponseOptions<T> {
  statusCode?: number;
  httpStatus?: HttpStatus;
  serialization?: ClassConstructor<T>;
}

export interface IDocResponsePagingOptions<T> extends Omit<IDocResponseOptions<T>, 'serialization'> {
  serialization: ClassConstructor<T>;
}

export interface IDocErrorOptions<T> {
  messagePath: string;
  options?: IDocResponseOptions<T>;
}
