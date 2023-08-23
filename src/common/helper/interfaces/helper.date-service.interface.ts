export interface IHelperDateService {
  startOfDay(date: Date): Date;
  getDay(date: Date): number;
  setMinutes(date: Date, minutes: number): Date;
  setHours(date: Date, hours: number): Date;
  addMinutes(date: Date, minutes: number): Date;
  isSaturday(date: Date): boolean;
  isSunday(date: Date): boolean;
  getNextWorkDay(date: Date): Date;
  isWorkWeekDay(date: Date): boolean;
}
