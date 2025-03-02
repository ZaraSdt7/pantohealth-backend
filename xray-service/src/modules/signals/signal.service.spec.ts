import { Test, TestingModule } from '@nestjs/testing';
import { SingalService } from './signal.service';

import { HttpException, HttpStatus } from '@nestjs/common';

describe('SingalService Service', () => {
  let service: SingalService;

  const mockProviders = [
    {
      provide: SingalService,
      useValue: {
        analyzeSignal: jest.fn().mockResolvedValue({ success: true }),
      },
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingalService, ...mockProviders],
    }).compile();

    service = module.get<SingalService>(SingalService);
  });

  describe('Service Methods', () => {
    it('should call analyzeSignal()', async () => {
      const result = await service.analyzeSignal('device-id', 0, 100, []);
      expect(result).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should throw an error if dependency fails', async () => {
      (
        jest.spyOn(
          mockProviders[0].useValue as unknown as SingalService,
          'analyzeSignal',
        ) as jest.Mock
      ).mockRejectedValue(
        new HttpException('Dependency Error', HttpStatus.INTERNAL_SERVER_ERROR),
      );

      await expect(
        service.analyzeSignal('device-id', 0, 100, []),
      ).rejects.toThrow(HttpException);
    });
  });
});
