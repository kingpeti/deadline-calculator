import { Global, Module } from '@nestjs/common';
import { HelperArrayService } from './services/helper.array.service';
import { HelperDateService } from './services/helper.date.service';
import { HelperNumberService } from './services/helper.number.service';
import { HelperStringService } from './services/helper.string.service';

@Global()
@Module({
  providers: [HelperArrayService, HelperDateService, HelperNumberService, HelperStringService],
  exports: [HelperArrayService, HelperDateService, HelperNumberService, HelperStringService],
  controllers: [],
  imports: [],
})
export class HelperModule {}
