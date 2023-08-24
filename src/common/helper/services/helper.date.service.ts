import { Injectable } from '@nestjs/common';
import { IHelperDateService } from 'src/common/helper/interfaces/helper.date-service.interface';
import { ENUM_HELPER_DATE_FORMAT } from '../constants/helper.enum.constant';
import {
  IHelperDateOptionsBackward,
  IHelperDateOptionsCreate,
  IHelperDateOptionsFormat,
  IHelperDateOptionsForward,
} from '../interfaces/helper.interface';

@Injectable()
export class HelperDateService implements IHelperDateService {
  public isWorkingDay(day: number): boolean {
    return day >= 1 && day <= 5;
  }

  public startOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  public format(date: Date, options?: IHelperDateOptionsFormat): string {
    const chosenFormat = options?.format || ENUM_HELPER_DATE_FORMAT.DATE;

    const replacements = {
      YYYY: String(date.getFullYear()),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      DD: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
      MMM: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
      dddd: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date),
      ddd: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      H: String(date.getHours()),
      m: String(date.getMinutes()),
      s: String(date.getSeconds()),
    };

    const formattedString = chosenFormat.replace(
      /YYYY|MM|DD|HH|mm|ss|MMM|dddd|ddd|H|m|s/g,
      (match) => replacements[match],
    );

    return formattedString;
  }

  public create(date?: string | number | Date, options?: IHelperDateOptionsCreate): Date {
    let mDate: Date;

    if (date instanceof Date) {
      mDate = new Date(date);
    } else if (typeof date === 'number') {
      mDate = new Date(date);
    } else if (typeof date === 'string') {
      mDate = new Date(date);
      if (isNaN(mDate.getTime())) {
        throw new Error('Invalid date string');
      }
    } else {
      mDate = new Date();
    }

    if (options?.startOfDay) {
      mDate.setHours(0, 0, 0, 0);
    }

    return mDate;
  }

  public timestamp(date?: string | number | Date, options?: IHelperDateOptionsCreate): number {
    let mDate: Date;

    if (date instanceof Date) {
      mDate = new Date(date);
    } else if (typeof date === 'number') {
      mDate = new Date(date);
    } else if (typeof date === 'string') {
      mDate = new Date(date);
      if (isNaN(mDate.getTime())) {
        throw new Error('Invalid date string');
      }
    } else {
      mDate = new Date();
    }

    if (options?.startOfDay) {
      mDate.setHours(0, 0, 0, 0);
    }

    return mDate.getTime();
  }

  public checkTimestamp(timestamp: number): boolean {
    return !isNaN(new Date(timestamp).getTime());
  }

  public backwardInMilliseconds(milliseconds: number, options?: IHelperDateOptionsBackward): Date {
    const fromDate = options?.fromDate || new Date();
    const resultDate = new Date(fromDate.getTime() - milliseconds);
    return resultDate;
  }

  public forwardInMilliseconds(milliseconds: number, options?: IHelperDateOptionsForward): Date {
    const fromDate = options?.fromDate || new Date();
    const resultDate = new Date(fromDate.getTime() + milliseconds);
    return resultDate;
  }

  public endOfDay(date?: Date): Date {
    const targetDate = date || new Date();
    const endOfDayDate = new Date(targetDate);
    endOfDayDate.setHours(23, 59, 59, 999);
    return endOfDayDate;
  }
}
