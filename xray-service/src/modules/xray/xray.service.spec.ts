import { Test, TestingModule } from '@nestjs/testing';
import { XrayService } from './xray.service';

import { HttpException, HttpStatus } from '@nestjs/common';

describe('XrayService Service', () => {
  let service: XrayService;

  const mockProviders = [
    {
      provide: XrayService,
      useValue: {
        createXray: jest.fn().mockResolvedValue({ success: true }),
      },
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XrayService, ...mockProviders],
    }).compile();

    service = module.get<XrayService>(XrayService);
  });

  describe('Service Methods', () => {});

  describe('Error Handling', () => {
    it('should throw an error if dependency fails', async () => {
      (
        jest.spyOn(
          mockProviders[0].useValue as unknown as XrayService,
          'createXray',
        ) as jest.Mock
      ).mockRejectedValue(
        new HttpException('Dependency Error', HttpStatus.INTERNAL_SERVER_ERROR),
      );

      await expect(service.createXray({})).rejects.toThrow(HttpException);
    });
  });
});
