import { applyDecorators } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
import { Doc, DocRequest, DocResponse } from 'src/common/doc/decorators/doc.decorator';
import { DeadlineCalculatorCalculateSerialization } from 'src/modules/user/serializations/deadline-calculator.calculate.serialization';

export function DeadlineCalculatorPublicCalculatorDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      operation: 'modules.public.deadlineCalculator',
    }),
    DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
    DocResponse<DeadlineCalculatorCalculateSerialization>('deadlineCalculator.calculator', {
      serialization: DeadlineCalculatorCalculateSerialization,
    }),
  );
}
