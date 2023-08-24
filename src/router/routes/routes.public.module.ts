import { Module } from '@nestjs/common';
import { DeadlineCalculatorPublicController } from 'src/modules/deadline-calculator/controllers/deadline-calculator.public.controller';
import { DeadlineCalculatorModule } from 'src/modules/deadline-calculator/deadline-calculator.module';

@Module({
  controllers: [DeadlineCalculatorPublicController],
  providers: [],
  exports: [],
  imports: [DeadlineCalculatorModule],
})
export class RoutesPublicModule {}
