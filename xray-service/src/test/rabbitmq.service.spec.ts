import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from '../modules/rabbitmq/rabbitmq.service';
import { ConfigModule } from '@nestjs/config';
import rabbitmqConfig from '../config/rabbitmq.config';

describe('RabbitMQService', () => {
  let service: RabbitMQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [rabbitmqConfig],
        }),
      ],
      providers: [RabbitMQService],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a message successfully', () => {
    const message = { test: 'Hello World' };
    const result = service.sendMessage('x-ray-data', message);
    expect(result).toBeUndefined();
  });
});
