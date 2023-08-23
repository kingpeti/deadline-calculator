import { applyDecorators, SerializeOptions, SetMetadata, UseInterceptors } from '@nestjs/common';
import {
  RESPONSE_MESSAGE_PATH_META_KEY,
  RESPONSE_MESSAGE_PROPERTIES_META_KEY,
  RESPONSE_SERIALIZATION_META_KEY,
} from 'src/common/response/constants/response.constant';
import { ResponseDefaultInterceptor } from 'src/common/response/interceptors/response.default.interceptor';
import { IResponseOptions } from 'src/common/response/interfaces/response.interface';

export function Response<T>(messagePath: string, options?: IResponseOptions<T>): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ResponseDefaultInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
    SetMetadata(RESPONSE_SERIALIZATION_META_KEY, options?.serialization),
    SetMetadata(RESPONSE_MESSAGE_PROPERTIES_META_KEY, options?.messageProperties),
  );
}

export const ResponseSerializationOptions = SerializeOptions;
