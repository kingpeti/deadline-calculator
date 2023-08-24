import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { DeadlineCalculatorService } from 'src/modules/deadline-calculator/services/deadline-calculator.service';

describe('DeadlineCalculatorService', () => {
  let service: DeadlineCalculatorService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'deadlineCalculator.workStartHour':
          return 9;
        case 'deadlineCalculator.workEndHour':
          return 17;
        case 'deadlineCalculator.workDaysPerWeek':
          return 5;
      }
    }),
  };

  beforeEach(async () => {
    const moduleRefRef: TestingModule = await Test.createTestingModule({
      providers: [
        DeadlineCalculatorService,
        HelperDateService,
        HelperStringService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    process.env.TZ = 'UTC';
    service = moduleRefRef.get<DeadlineCalculatorService>(DeadlineCalculatorService);
  });
  afterEach(() => {
    service = undefined;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate the correct deadline', async () => {
    const submitDate = new Date(2023, 7, 23, 11, 30); // August 23, 2023, 11:30 AM (months are zero-based)
    const turnaroundTime = 2; // 2 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time based on your calculations
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(23);
    expect(resolvedDate.getHours()).toBe(13); // 11:30 AM + 2 hours
    expect(resolvedDate.getMinutes()).toBe(30);
  });

  it('should calculate the correct deadline with weekend adjustment', async () => {
    const submitDate = new Date(2023, 7, 25, 16, 0); // August 25, 2023, 4:00 PM (Friday)
    const turnaroundTime = 8; // 8 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time considering weekend adjustment
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(28); // August 29, 2023 (Tuesday)
    expect(resolvedDate.getHours()).toBe(16); // 9 AM + 7 hours (Monday)
    expect(resolvedDate.getMinutes()).toBe(0);
  });

  it('should calculate the correct deadline for a short turnaround time', async () => {
    const submitDate = new Date(2023, 7, 25, 12, 0); // August 25, 2023, 12:00 PM (Friday)
    const turnaroundTime = 0.5; // 0.5 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time for a short turnaround time
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(25); // August 25, 2023 (Friday)
    expect(resolvedDate.getHours()).toBe(12); // 12 PM + 0.5 hours
    expect(resolvedDate.getMinutes()).toBe(30);
  });

  it('should calculate the correct deadline for a long turnaround time', async () => {
    const submitDate = new Date(2023, 7, 25, 9, 0); // August 25, 2023, 9:00 AM (Thursday)
    const turnaroundTime = 48; // 40 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time for a long turnaround time
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(8);
    expect(resolvedDate.getDate()).toBe(1); // September 1, 2023 (Thursday)
    expect(resolvedDate.getHours()).toBe(17); // 5 PM (last working hour)
    expect(resolvedDate.getMinutes()).toBe(0);
  });

  it('should calculate the correct deadline when submission is outside of working hours', async () => {
    const submitDate = new Date(2023, 7, 24, 18, 0); // August 24, 2023, 6:00 PM (Wednesday)
    const turnaroundTime = 9; // 9 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time when submission is outside of working hours
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(28); // August 28, 2023 (Sunday)
    expect(resolvedDate.getHours()).toBe(10); // 10 AM (first working hour on Monday)
    expect(resolvedDate.getMinutes()).toBe(0);
  });

  it('should calculate the correct deadline for a turnaround time spanning multiple weeks', async () => {
    const submitDate = new Date(2023, 7, 18, 14, 0); // August 18, 2023, 2:00 PM (Thursday)
    const turnaroundTime = 100; // 100 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time for a turnaround spanning multiple weeks
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(8); // September
    expect(resolvedDate.getDate()).toBe(6); // September 6, 2023 (Tuesday)
    expect(resolvedDate.getHours()).toBe(10); // 10 AM
    expect(resolvedDate.getMinutes()).toBe(0);
  });

  it('should calculate the correct deadline for a very short turnaround time', async () => {
    const submitDate = new Date(2023, 7, 21, 16, 30); // August 21, 2023, 4:30 PM (Monday)
    const turnaroundTime = 0.1; // 0.1 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time for a very short turnaround time
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(21); // August 21, 2023 (Monday)
    expect(resolvedDate.getHours()).toBe(16); // 4:30 PM + 0.1 hours
    expect(resolvedDate.getMinutes()).toBe(36); // Rounded up from 33
  });

  it('should calculate the correct deadline when the submission is at the start of the workday', async () => {
    const submitDate = new Date(2023, 7, 28, 9, 0); // August 28, 2023, 9:00 AM (Monday)
    const turnaroundTime = 4; // 4 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time when the submission is at the start of the workday
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(28); // August 28, 2023 (Monday)
    expect(resolvedDate.getHours()).toBe(13); // 9 AM + 4 hours
    expect(resolvedDate.getMinutes()).toBe(0);
  });

  it('should calculate the correct deadline when the submission is at the end of the workday', async () => {
    const submitDate = new Date(2023, 7, 29, 17, 0); // August 29, 2023, 5:00 PM (Tuesday)
    const turnaroundTime = 2; // 2 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time when the submission is at the end of the workday
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(30); // August 30, 2023 (Wednesday)
    expect(resolvedDate.getHours()).toBe(11); // 9 AM + 2 hours
    expect(resolvedDate.getMinutes()).toBe(0);
  });

  it('should calculate the correct deadline for a turnaround time of 0', async () => {
    const submitDate = new Date(2023, 7, 31, 10, 0); // August 31, 2023, 10:00 AM (Thursday)
    const turnaroundTime = 0; // 0 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time for a turnaround time of 0
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(31); // August 31, 2023 (Thursday)
    expect(resolvedDate.getHours()).toBe(10); // No time added
    expect(resolvedDate.getMinutes()).toBe(0);
  });

  it('should calculate the correct deadline for a long turnaround time spanning weekends', async () => {
    const submitDate = new Date(2023, 7, 18, 15, 30); // August 18, 2023, 3:30 PM (Friday)
    const turnaroundTime = 70; // 70 working hours

    const resolvedDate = await service.calculateDeadline(submitDate, turnaroundTime);

    // Assert the resolved date and time for a long turnaround time spanning weekends
    expect(resolvedDate.getFullYear()).toBe(2023);
    expect(resolvedDate.getMonth()).toBe(7);
    expect(resolvedDate.getDate()).toBe(31); // August 30, 2023 (Wednesday)
    expect(resolvedDate.getHours()).toBe(13); // 2 PM
    expect(resolvedDate.getMinutes()).toBe(30);
  });
});
