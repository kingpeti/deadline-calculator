import { Module } from '@nestjs/common';
import { DeadlineCalculatorService } from './services/deadline-calculator.service';

@Module({
  exports: [DeadlineCalculatorService],
  providers: [DeadlineCalculatorService],
  controllers: [],
})
export class DeadlineCalculatorModule {}
