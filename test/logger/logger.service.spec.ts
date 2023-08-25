import { ConsoleLogger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ENUM_LOGGER_ACTION, ENUM_LOGGER_LEVEL } from 'src/common/logger/constants/logger.enum.constant';
import { LoggerCreateDto, LoggerCreateRawDto } from 'src/common/logger/dtos/logger.create.dto';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { ENUM_REQUEST_METHOD } from 'src/common/request/constants/request.enum.constant';

describe('LoggerService', () => {
  let service: LoggerService;
  let mockConsoleLogger: jest.Mocked<Partial<ConsoleLogger>>;
  beforeEach(async () => {
    mockConsoleLogger = {
      log: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      fatal: jest.fn(),
      verbose: jest.fn(),
    };

    const moduleRefRef: TestingModule = await Test.createTestingModule({
      providers: [LoggerService, { provide: ConsoleLogger, useValue: mockConsoleLogger }],
    }).compile();

    service = moduleRefRef.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('info()', () => {
    it('should log info', async () => {
      const loggerCreateDto: LoggerCreateDto = {
        anonymous: true,
        action: ENUM_LOGGER_ACTION.TEST,
        description: 'testDescription',
        method: ENUM_REQUEST_METHOD.GET,
        requestId: '1',
        params: {},
        bodies: {},
        path: '/test',
        statusCode: 200,
        tags: [],
      };

      await service.info(loggerCreateDto);

      expect(mockConsoleLogger.log).toBeCalledWith({
        level: ENUM_LOGGER_LEVEL.INFO,
        anonymous: true,
        ...loggerCreateDto,
      });
    });
  });
  describe('debug()', () => {
    it('should log debug', async () => {
      const loggerCreateDto: LoggerCreateDto = {
        action: ENUM_LOGGER_ACTION.TEST,
        description: 'testDescription',
        method: ENUM_REQUEST_METHOD.GET,
        requestId: '1',
        anonymous: false,
        params: {},
        bodies: {},
        path: '/test',
        statusCode: 200,
        tags: [],
      };

      await service.debug(loggerCreateDto);

      expect(mockConsoleLogger.debug).toBeCalledWith({
        level: ENUM_LOGGER_LEVEL.DEBUG,
        ...loggerCreateDto,
      });
    });
  });

  describe('warn()', () => {
    it('should log warn', async () => {
      const loggerCreateDto: LoggerCreateDto = {
        action: ENUM_LOGGER_ACTION.TEST,
        description: 'testDescription',
        method: ENUM_REQUEST_METHOD.GET,
        requestId: '1',
        anonymous: false,
        params: {},
        bodies: {},
        path: '/test',
        statusCode: 200,
        tags: [],
      };

      await service.warn(loggerCreateDto);

      expect(mockConsoleLogger.warn).toBeCalledWith({
        level: ENUM_LOGGER_LEVEL.WARN,
        ...loggerCreateDto,
      });
    });
  });

  describe('fatal()', () => {
    it('should log fatal', async () => {
      const loggerCreateDto: LoggerCreateDto = {
        action: ENUM_LOGGER_ACTION.TEST,
        description: 'testDescription',
        method: ENUM_REQUEST_METHOD.GET,
        requestId: '1',
        anonymous: false,
        params: {},
        bodies: {},
        path: '/test',
        statusCode: 500,
        tags: [],
      };

      await service.fatal(loggerCreateDto);

      expect(mockConsoleLogger.fatal).toBeCalledWith({
        level: ENUM_LOGGER_LEVEL.FATAL,
        ...loggerCreateDto,
      });
    });
  });

  describe('raw()', () => {
    it('should log raw', async () => {
      const loggerCreateRawDto: LoggerCreateRawDto = {
        level: ENUM_LOGGER_LEVEL.INFO,
        action: ENUM_LOGGER_ACTION.TEST,
        description: 'testDescription',
        method: ENUM_REQUEST_METHOD.GET,
        requestId: '1',
        anonymous: false,
        params: {},
        bodies: {},
        path: '/test',
        statusCode: 200,
        tags: [],
      };

      await service.raw(loggerCreateRawDto);

      expect(mockConsoleLogger.verbose).toBeCalledWith(loggerCreateRawDto);
    });
  });
});
