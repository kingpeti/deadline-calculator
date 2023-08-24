import { registerAs } from '@nestjs/config';

export default registerAs(
  'deadlineCalculator',
  (): Record<string, number> => ({
    workStartHour: 9,
    workEndHour: 17,
    workDaysPerWeek: 5,
  }),
);
