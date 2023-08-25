import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidWorkingHourConstraint implements ValidatorConstraintInterface {
  private readonly WORKING_HOUR_START: number;
  private readonly WORKING_HOUR_END: number;
  constructor(
    protected readonly helperDateService: HelperDateService,
    protected readonly configService: ConfigService,
  ) {
    this.WORKING_HOUR_START = this.configService.get<number>('deadlineCalculator.workStartHour');
    this.WORKING_HOUR_END = this.configService.get<number>('deadlineCalculator.workEndHour');
  }
  validate(value: string | number | Date) {
    const date = new Date(value);
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hours = date.getHours(); // 0 to 23

    if (!this.helperDateService.isWorkingDay(day)) {
      return false;
    }

    if (hours < this.WORKING_HOUR_START || hours >= this.WORKING_HOUR_END) {
      return false;
    }

    return true;
  }
}

export function IsValidWorkingHour(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): any {
    registerDecorator({
      name: 'IsValidWorkingHour',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidWorkingHourConstraint,
    });
  };
}
