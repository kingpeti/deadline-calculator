import {
  IHelperDateOptionsFormat,
  IHelperDateOptionsCreate,
  IHelperDateOptionsBackward,
  IHelperDateOptionsForward,
} from './helper.interface';

export interface IHelperDateService {
  isWorkingDay(day: number): boolean;
  startOfDay(date: Date): Date;
  format(date: Date, options?: IHelperDateOptionsFormat): string;
  create(date?: string | number | Date, options?: IHelperDateOptionsCreate): Date;
  timestamp(date?: string | number | Date, options?: IHelperDateOptionsCreate): number;
  checkTimestamp(timestamp: number): boolean;
  backwardInMilliseconds(milliseconds: number, options?: IHelperDateOptionsBackward): Date;
  forwardInMilliseconds(milliseconds: number, options?: IHelperDateOptionsForward): Date;
  endOfDay(date?: Date): Date;
}
