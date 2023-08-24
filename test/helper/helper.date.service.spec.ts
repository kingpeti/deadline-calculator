import { Test, TestingModule } from '@nestjs/testing';
import { ENUM_HELPER_DATE_DIFF, ENUM_HELPER_DATE_FORMAT } from 'src/common/helper/constants/helper.enum.constant';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';

describe('HelperDateService', () => {
  let service: HelperDateService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [HelperDateService],
    }).compile();

    process.env.TZ = 'UTC';
    service = moduleRef.get<HelperDateService>(HelperDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isWorkingDay', () => {
    it('should return true for days 1-5', () => {
      expect(service.isWorkingDay(1)).toBe(true);
      expect(service.isWorkingDay(2)).toBe(true);
      expect(service.isWorkingDay(3)).toBe(true);
      expect(service.isWorkingDay(4)).toBe(true);
      expect(service.isWorkingDay(5)).toBe(true);
    });

    it('should return false for days other than 1-5', () => {
      expect(service.isWorkingDay(0)).toBe(false);
      expect(service.isWorkingDay(6)).toBe(false);
      expect(service.isWorkingDay(7)).toBe(false);
    });
  });

  describe('startOfDay', () => {
    it('should reset time to the start of the day', () => {
      const date = new Date(2023, 7, 24, 12, 34, 56); // Aug 24, 2023, 12:34:56
      const startOfDay = service.startOfDay(date);

      expect(startOfDay.getFullYear()).toBe(2023);
      expect(startOfDay.getMonth()).toBe(7);
      expect(startOfDay.getDate()).toBe(24);
      expect(startOfDay.getHours()).toBe(0);
      expect(startOfDay.getMinutes()).toBe(0);
      expect(startOfDay.getSeconds()).toBe(0);
      expect(startOfDay.getMilliseconds()).toBe(0);
    });
  });

  describe('create', () => {
    it('should create a current date', () => {
      const createdDate = service.create();
      expect(createdDate).toEqual(new Date(createdDate));
    });

    it('should create a date with given options', () => {
      const date = '2021-01-01';
      const startOfDay = true;
      const createdDate = service.create(date, { startOfDay });
      expect(createdDate).toEqual(new Date(`2021-01-01T00:00:00.000Z`));
    });

    it('should create a date with given options as a number type', () => {
      const date = Date.parse('2021-01-01');
      const startOfDay = true;
      const createdDate = service.create(date, { startOfDay });
      expect(createdDate).toEqual(new Date(`2021-01-01T00:00:00.000Z`));
    });

    it('should create a date with given options as a Date type', () => {
      const date = new Date('2021-01-01');
      const startOfDay = true;
      const createdDate = service.create(date, { startOfDay });
      expect(createdDate).toEqual(new Date(`2021-01-01T00:00:00.000Z`));
    });

    it('should throw when using invalid string', () => {
      const date = 'not a valid string';
      const startOfDay = true;
      expect(() => service.create(date, { startOfDay })).toThrow(new Error('Invalid date string'));
    });
  });

  describe('timestamp', () => {
    it('should return a current timestamp', () => {
      const createdTimestamp = service.timestamp();
      expect(createdTimestamp).toEqual(new Date(createdTimestamp).getTime());
    });

    it('should return a timestamp with given options', () => {
      const date = '2021-01-01T00:00:00.000Z';
      const startOfDay = true;
      const createdTimestamp = service.timestamp(date, { startOfDay });
      expect(createdTimestamp).toEqual(new Date(date).getTime());
    });

    it('should return a timestamp with given options as a number type', () => {
      const date = Date.parse('2021-01-01T00:00:00.000Z');
      const startOfDay = true;
      const createdTimestamp = service.timestamp(date, { startOfDay });
      expect(createdTimestamp).toEqual(new Date(date).getTime());
    });

    it('should return a timestamp with given options as a Date type', () => {
      const date = new Date('2021-01-01T00:00:00.000Z');
      const startOfDay = true;
      const createdTimestamp = service.timestamp(date, { startOfDay });
      expect(createdTimestamp).toEqual(new Date(date).getTime());
    });

    it('should throw when using invalid string', () => {
      const date = 'not a valid string';
      const startOfDay = true;
      expect(() => service.timestamp(date, { startOfDay })).toThrow(new Error('Invalid date string'));
    });
  });

  describe('format', () => {
    it('should format a date', () => {
      const date = new Date('2021-01-01');
      const formattedDate = service.format(date);
      expect(formattedDate).toEqual('2021-01-01');
    });

    it('should format a date with given options', () => {
      const date = new Date('2021-01-01');
      const format = ENUM_HELPER_DATE_FORMAT.ONLY_MONTH;
      const formattedDate = service.format(date, { format });
      expect(formattedDate).toEqual('01');
    });
  });

  describe('checkTimestamp', () => {
    it('should check if a given timestamp is valid', () => {
      const validTimestamp = new Date().getTime();
      expect(service.checkTimestamp(validTimestamp)).toEqual(true);
    });
  });

  describe('backwardInMilliseconds', () => {
    it('should move the date backward by the given milliseconds', () => {
      const fromDate = new Date('2023-08-24T12:00:00.000Z');
      const result = service.backwardInMilliseconds(1000, { fromDate });

      expect(result.getTime()).toBe(fromDate.getTime() - 1000);
    });

    it('should use current date if fromDate is not provided', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-08-24T12:00:00.000Z'));

      const result = service.backwardInMilliseconds(1000);

      expect(result.getTime()).toBe(new Date('2023-08-24T12:00:00.000Z').getTime() - 1000);

      jest.useRealTimers();
    });
  });

  describe('forwardInMilliseconds', () => {
    it('should move the date forward by the given milliseconds', () => {
      const fromDate = new Date('2023-08-24T12:00:00.000Z');
      const result = service.forwardInMilliseconds(1000, { fromDate });

      expect(result.getTime()).toBe(fromDate.getTime() + 1000);
    });

    it('should use current date if fromDate is not provided', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-08-24T12:00:00.000Z'));

      const result = service.forwardInMilliseconds(1000);

      expect(result.getTime()).toBe(new Date('2023-08-24T12:00:00.000Z').getTime() + 1000);

      jest.useRealTimers();
    });
  });

  describe('endOfDay', () => {
    it('should set the date to the end of the day', () => {
      const fromDate = new Date('2023-08-24T12:00:00.000Z');
      const result = service.endOfDay(fromDate);

      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it('should use current date if date is not provided', () => {
      jest.useFakeTimers();
      Date.now = jest.fn(() => new Date('2023-08-24T12:00:00.000Z').getTime());

      const result = service.endOfDay();

      expect(result.getTime()).toBe(new Date('2023-08-24T23:59:59.999Z').getTime());

      jest.useRealTimers();
    });
  });
});
