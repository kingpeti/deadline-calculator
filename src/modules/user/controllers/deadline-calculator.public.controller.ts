import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/common/response/decorators/response.decorator';
import { DeadlineCalculatorCalculateDto } from '../dtos/deadline-calculator.calculate.dto';
import { DeadlineCalculatorCalculateSerialization } from '../serializations/deadline-calculator.calculate.serialization';
import { DeadlineCalculatorService } from '../services/deadline-calculator.service';
import { DeadlineCalculatorPublicCalculatorDoc } from '../docs/deadline-calculator.public.doc';

@ApiTags('modules.public.deadlineCalculator')
@Controller({
  version: '1',
  path: '/deadline',
})
export class DeadlineCalculatorPublicController {
  constructor(private readonly deadlineCalculatorService: DeadlineCalculatorService) {}

  @DeadlineCalculatorPublicCalculatorDoc()
  @Response('deadlineCalculator.calculate', {
    serialization: DeadlineCalculatorCalculateSerialization,
  })
  @Post('/calculate')
  async calculate(@Body() data: DeadlineCalculatorCalculateDto): Promise<{ resolutionDate: Date }> {
    const submitDate = new Date(data.submitDate);
    const resolutionDate = await this.deadlineCalculatorService.calculateDeadline(submitDate, data.turnaroundHours);
    return { resolutionDate };
  }
}
