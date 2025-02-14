import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Xray } from '../modules/xray/xray.schema';
import { SingalService } from '../modules/signals/signal.service';

describe('SignalsService', () => {
  let service: SingalService;

  const mockXrayModel = {
    find: jest
      .fn()
      .mockResolvedValue([
        { deviceId: 'test-device', time: 123456789, data: [] },
      ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SingalService,
        {
          provide: getModelToken(Xray.name),
          useValue: mockXrayModel,
        },
      ],
    }).compile();

    service = module.get<SingalService>(SingalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should analyze signals by deviceId and time', async () => {
    const result = await service.analyzeSignal('test-device', 1000, 2000);
    expect(result).toEqual([
      { deviceId: 'test-device', time: 123456789, data: [] },
    ]);
    expect(mockXrayModel.find).toHaveBeenCalledWith({
      deviceId: 'test-device',
      time: { $gte: 1000, $lte: 2000 },
    });
  });
});
