import { Test, TestingModule } from '@nestjs/testing';
import { XrayController } from '../src/xray/xray.controller';
import { XrayService } from '../src/xray/xray.service';
import { HttpException, HttpStatus } from '@nestjs/common';

// Mock Providers
const mockXrayService = {
  provide: XrayService,
  useValue: {
    getData: jest.fn(),
  },
};

describe('XrayController Controller', () => {
  let controller: XrayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XrayController],
      providers: [mockXrayService],
    }).compile();

    controller = module.get<XrayController>(XrayController);
  });

  describe('Controller Methods', () => {});

  describe('Error Handling', () => {
    it('should throw an error if dependency fails', async () => {
      jest
        .spyOn(mockXrayService.useValue, 'getData')
        .mockRejectedValue(
          new HttpException(
            'Dependency Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      try {
        await controller.getData();
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.response.message).toEqual('Dependency Error');
        expect(e.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
