import { faker } from '@faker-js/faker';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiConsumes,
  ApiExtraModels,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { APP_LANGUAGE } from 'src/app/constants/app.constant';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import {
  IDocDefaultOptions,
  IDocOfOptions,
  IDocOptions,
  IDocRequestOptions,
  IDocResponseOptions,
  IDocResponsePagingOptions,
} from 'src/common/doc/interfaces/doc.interface';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from 'src/common/request/constants/request.status-code.constant';
import { ResponseDefaultSerialization } from 'src/common/response/serializations/response.default.serialization';
import { ResponsePagingSerialization } from 'src/common/response/serializations/response.paging.serialization';

export function DocDefault<T>(options: IDocDefaultOptions): MethodDecorator {
  const docs = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
    properties: {
      message: {
        example: options.messagePath,
      },
      statusCode: {
        type: 'number',
        example: options.statusCode,
      },
    },
  };

  if (options.serialization) {
    docs.push(ApiExtraModels(options.serialization));
    schema.properties = {
      ...schema.properties,
      data: {
        $ref: getSchemaPath(options.serialization),
      },
    };
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: options.httpStatus,
      schema,
    }),
    ...docs,
  );
}

export function DocOneOf<T>(httpStatus: HttpStatus, ...documents: IDocOfOptions[]): MethodDecorator {
  const docs = [];
  const oneOf = [];

  for (const doc of documents) {
    const oneOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
      properties: {
        message: {
          example: doc.messagePath,
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode ?? HttpStatus.OK,
        },
      },
    };

    if (doc.serialization) {
      docs.push(ApiExtraModels(doc.serialization));
      oneOfSchema.properties = {
        ...oneOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.serialization),
        },
      };
    }

    oneOf.push(oneOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        oneOf,
      },
    }),
    ...docs,
  );
}

export function DocAnyOf<T>(httpStatus: HttpStatus, ...documents: IDocOfOptions[]): MethodDecorator {
  const docs = [];
  const anyOf = [];

  for (const doc of documents) {
    const anyOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
      properties: {
        message: {
          example: doc.messagePath,
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode ?? HttpStatus.OK,
        },
      },
    };

    if (doc.serialization) {
      docs.push(ApiExtraModels(doc.serialization));
      anyOfSchema.properties = {
        ...anyOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.serialization),
        },
      };
    }

    anyOf.push(anyOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        anyOf,
      },
    }),
    ...docs,
  );
}

export function DocAllOf<T>(httpStatus: HttpStatus, ...documents: IDocOfOptions[]): MethodDecorator {
  const docs = [];
  const allOf = [];

  for (const doc of documents) {
    const allOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
      properties: {
        message: {
          example: doc.messagePath,
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode ?? HttpStatus.OK,
        },
      },
    };

    if (doc.serialization) {
      docs.push(ApiExtraModels(doc.serialization));
      allOfSchema.properties = {
        ...allOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.serialization),
        },
      };
    }

    allOf.push(allOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        allOf,
      },
    }),
    ...docs,
  );
}

export function Doc(options?: IDocOptions): MethodDecorator {
  const currentTimestamp: number = new Date().valueOf();
  const userAgent: string = faker.internet.userAgent();

  return applyDecorators(
    ApiOperation({
      summary: options?.operation,
      deprecated: options?.deprecated,
      description: options?.description,
    }),
    ApiHeaders([
      {
        name: 'user-agent',
        description: 'User agent header',
        required: false,
        schema: {
          default: userAgent,
          example: userAgent,
          type: 'string',
        },
      },
      {
        name: 'x-custom-lang',
        description: 'Custom language header',
        required: false,
        schema: {
          default: APP_LANGUAGE,
          example: APP_LANGUAGE,
          type: 'string',
        },
      },
      {
        name: 'x-timestamp',
        description: 'Timestamp header, in microseconds',
        required: false,
        schema: {
          default: currentTimestamp,
          example: currentTimestamp,
          type: 'number',
        },
      },
    ]),
    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      messagePath: 'http.serverError.serviceUnavailable',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_SERVICE_UNAVAILABLE,
    }),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      messagePath: 'http.serverError.internalServerError',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      messagePath: 'http.serverError.requestTimeout',
      statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_REQUEST_TIMEOUT,
    }),
  );
}

export function DocRequest(options?: IDocRequestOptions) {
  const docs: Array<ClassDecorator | MethodDecorator> = [];

  if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA) {
    docs.push(ApiConsumes('multipart/form-data'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.TEXT) {
    docs.push(ApiConsumes('text/plain'));
  } else if (options?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.JSON) {
    docs.push(ApiConsumes('application/json'));
  }

  if (options?.bodyType) {
    docs.push(
      DocDefault({
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
        statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
        messagePath: 'request.validation',
      }),
    );
  }

  if (options?.params) {
    const params: MethodDecorator[] = options?.params?.map((param) => ApiParam(param));
    docs.push(...params);
  }

  if (options?.queries) {
    const queries: MethodDecorator[] = options?.queries?.map((query) => ApiQuery(query));
    docs.push(...queries);
  }

  return applyDecorators(...docs);
}

export function DocResponse<T = void>(messagePath: string, options?: IDocResponseOptions<T>): MethodDecorator {
  const docs: IDocDefaultOptions = {
    httpStatus: options?.httpStatus ?? HttpStatus.OK,
    messagePath,
    statusCode: options?.statusCode ?? options?.httpStatus ?? HttpStatus.OK,
  };

  if (options?.serialization) {
    docs.serialization = options?.serialization;
  }

  return applyDecorators(ApiProduces('application/json'), DocDefault(docs));
}

export function DocErrorGroup(docs: MethodDecorator[]) {
  return applyDecorators(...docs);
}

export function DocResponsePaging<T = void>(
  messagePath: string,
  options: IDocResponsePagingOptions<T>,
): MethodDecorator {
  const docs: IDocDefaultOptions = {
    httpStatus: options?.httpStatus ?? HttpStatus.OK,
    messagePath,
    statusCode: options?.statusCode ?? options?.httpStatus ?? HttpStatus.OK,
  };

  if (options?.serialization) {
    docs.serialization = options?.serialization;
  }

  return applyDecorators(
    ApiProduces('application/json'),
    ApiQuery({
      name: 'search',
      required: false,
      allowEmptyValue: true,
      type: 'string',
      description: 'Search will base on _metadata.pagination._availableSearch with rule contains, and case insensitive',
    }),
    ApiQuery({
      name: 'perPage',
      required: false,
      allowEmptyValue: true,
      example: 20,
      type: 'number',
      description: 'Data per page, max 100',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      allowEmptyValue: true,
      example: 1,
      type: 'number',
      description: 'page number, max 20',
    }),
    ApiQuery({
      name: 'orderBy',
      required: false,
      allowEmptyValue: true,
      example: 'createdAt',
      type: 'string',
      description: 'Order by base on _metadata.pagination.availableOrderBy',
    }),
    ApiExtraModels(ResponsePagingSerialization<T>),
    ApiExtraModels(options.serialization),
    ApiResponse({
      status: docs.httpStatus,
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponsePagingSerialization<T>) }],
        properties: {
          message: {
            example: messagePath,
          },
          statusCode: {
            type: 'number',
            example: docs.statusCode,
          },
          data: {
            type: 'array',
            items: {
              $ref: getSchemaPath(docs.serialization),
            },
          },
        },
      },
    }),
  );
}
