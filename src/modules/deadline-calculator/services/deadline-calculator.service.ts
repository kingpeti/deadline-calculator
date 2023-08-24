import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { IDeadlineCalculatorService } from '../interfaces/deadline-calculator.service.interface';

@Injectable()
export class DeadlineCalculatorService implements IDeadlineCalculatorService {
  private readonly WORKING_HOUR_START: number;
  private readonly WORKING_HOUR_END: number;

  constructor(private readonly helperDateService: HelperDateService, private readonly configService: ConfigService) {
    this.WORKING_HOUR_START = this.configService.get<number>('deadlineCalculator.workStartHour');
    this.WORKING_HOUR_END = this.configService.get<number>('deadlineCalculator.workEndHour');
  }

  async calculateDeadline(deadline: Date, remainingTime: number): Promise<Date> {
    if (remainingTime <= 0) {
      return deadline;
    }

    if (this.helperDateService.isWorkingDay(deadline.getDay())) {
      const currentHour = deadline.getHours();
      const currentMinute = deadline.getMinutes();
      const currentSecond = deadline.getSeconds();

      if (currentHour >= this.WORKING_HOUR_START && currentHour < this.WORKING_HOUR_END) {
        const workTimeLeftToday = this.WORKING_HOUR_END - currentHour - currentMinute / 60 - currentSecond / 3600;
        const timeToAdd = Math.min(workTimeLeftToday, remainingTime);

        deadline.setSeconds(deadline.getSeconds() + timeToAdd * 3600);
        remainingTime -= timeToAdd;

        if (remainingTime === 0 && deadline.getHours() === this.WORKING_HOUR_END) {
          deadline.setHours(this.WORKING_HOUR_END);
          deadline.setMinutes(0);
          deadline.setSeconds(0);
        } else if (deadline.getHours() >= this.WORKING_HOUR_END) {
          deadline.setHours(this.WORKING_HOUR_START);
          deadline.setMinutes(0);
          deadline.setSeconds(0);
          deadline.setDate(deadline.getDate() + 1);
        }
      } else if (currentHour >= this.WORKING_HOUR_END) {
        deadline.setHours(this.WORKING_HOUR_START);
        deadline.setMinutes(0);
        deadline.setSeconds(0);
        deadline.setDate(deadline.getDate() + 1);
      }
    } else {
      deadline.setDate(deadline.getDate() + 1);
      deadline.setHours(this.WORKING_HOUR_START);
      deadline.setMinutes(0);
      deadline.setSeconds(0);
    }

    return this.calculateDeadline(deadline, remainingTime);
  }
}
