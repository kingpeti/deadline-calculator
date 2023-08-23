import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { IDeadlineCalculatorService } from '../interfaces/deadline-calculator.service.interface';

@Injectable()
export class DeadlineCalculatorService implements IDeadlineCalculatorService {
  private readonly workStartHour: number;
  private readonly workEndHour: number;
  private readonly workDaysPerWeek: number;

  constructor(
    // private readonly deadlineCalculatorRepository: DeadlineCalculatorRepository,
    private readonly helperDateService: HelperDateService,
    // private readonly helperStringService: HelperStringService,
    private readonly configService: ConfigService,
  ) {
    this.workStartHour = this.configService.get<number>('deadlineCalculator.workStartHour');
    this.workEndHour = this.configService.get<number>('deadlineCalculator.workEndHour');
    this.workDaysPerWeek = this.configService.get<number>('deadlineCalculator.workDaysPerWeek');
  }

  async calculateDeadline(submitDate: Date, turnaroundTime: number): Promise<Date> {
    // Convert turnaround time to minutes
    const turnaroundMinutes = turnaroundTime * 60;

    // Calculate total minutes to add to submitDate
    let totalMinutes = turnaroundMinutes;

    // Calculate the resolved date and time
    let resolvedDate = submitDate;

    // Calculate the remaining working hours
    const workRemainHour = (this.workEndHour - this.workStartHour) * 60;

    // Add full weeks
    const fullWeeks = Math.floor(totalMinutes / (this.workDaysPerWeek * workRemainHour));
    totalMinutes -= fullWeeks * (this.workDaysPerWeek * workRemainHour);

    // Add remaining days
    let remainingMinutes = totalMinutes;
    while (remainingMinutes >= workRemainHour) {
      if (this.helperDateService.isWorkWeekDay(resolvedDate)) {
        resolvedDate = this.helperDateService.getNextWorkDay(resolvedDate);
      }
      remainingMinutes -= workRemainHour;
    }

    // Handle starting from non-working hours
    if (this.helperDateService.getDay(resolvedDate) !== 0 && this.helperDateService.getDay(resolvedDate) !== 6) {
      const startOfWorkDay = this.helperDateService.setMinutes(
        this.helperDateService.setHours(this.helperDateService.startOfDay(resolvedDate), this.workStartHour),
        0,
      );
      if (resolvedDate < startOfWorkDay) {
        resolvedDate = startOfWorkDay;
      }
    }

    // Add remaining minutes
    resolvedDate = this.helperDateService.addMinutes(resolvedDate, remainingMinutes);

    return resolvedDate;
  }
}
