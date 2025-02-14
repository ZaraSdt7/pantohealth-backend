import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { XrayService } from '../modules/xray/xray.service';
import { Xray } from '../modules/xray/xray.schema';

describe('XrayService', () => {
  let service: XrayService;

  const mockXrayModel = {
    create: jest.fn().mockResolvedValue({ _id: 'test-id' }),
    find: jest.fn().mockResolvedValue([{ _id: 'test-id' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XrayService,
        {
          provide: getModelToken(Xray.name),
          useValue: mockXrayModel,
        },
      ],
    }).compile();

    service = module.get<XrayService>(XrayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new X-ray record', async () => {
    const result = await service.createXray({
      deviceId: 'test-device',
      time: Date.now(),
      dataLength: 3,
      dataVolume: 150,
      data: [],
    });
    expect(result.deviceId).toEqual('test-id');
  });

  it('should get all X-ray records', async () => {
    const result = await service.findAllXrays();
    expect(result).toEqual([{ _id: 'test-id' }]);
  });
});
