import { Module } from '@nestjs/common';
import { DeadlineCalculatorPublicController } from 'src/modules/user/controllers/deadline-calculator.public.controller';
import { DeadlineCalculatorModule } from 'src/modules/user/deadline-calculator.module';

@Module({
  controllers: [DeadlineCalculatorPublicController],
  providers: [],
  exports: [],
  imports: [DeadlineCalculatorModule],
})
export class RoutesPublicModule {}
