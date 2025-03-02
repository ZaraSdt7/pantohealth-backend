import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from './rabbitmq.service';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RabbitMQService Service', () => {
  let service: RabbitMQService;

  const mockProviders = [
    {
      provide: RabbitMQService,
      useValue: {
        onModuleInit: jest.fn().mockResolvedValue({ success: true }),
      },
    },
    {
      provide: ConfigService,
      useValue: {
        onModuleInit: jest.fn().mockResolvedValue({ success: true }),
      },
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMQService, ...mockProviders],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
  });

  describe('Service Methods', () => {
    it('should call onModuleInit()', () => {
      const result = service.onModuleInit();
      expect(result).toBeDefined();
    });

    it('should initialize client in onModuleInit()', () => {
      service.onModuleInit();
      // After calling onModuleInit, the client should be initialized
      expect(service['client']).toBeDefined();
    });

    it('should call sendMessage()', () => {
      const result = service.sendMessage('test-pattern', { data: 'test' });
      expect(result).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should throw an error if dependency fails', async () => {
      (
        jest.spyOn(
          mockProviders[0].useValue as unknown as RabbitMQService,
          'onModuleInit',
        ) as jest.Mock
      ).mockRejectedValue(
        new HttpException('Dependency Error', HttpStatus.INTERNAL_SERVER_ERROR),
      );

      await expect(() => service.onModuleInit()).rejects.toThrow(HttpException);
    });
  });
});
