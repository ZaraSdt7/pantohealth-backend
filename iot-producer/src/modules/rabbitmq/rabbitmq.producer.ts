import { Injectable, Logger } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class RabbitMQProducer {
  private readonly logger = new Logger(RabbitMQProducer.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  sendXRayData() {
    const data = {
      deviceId: '66bb584d4ae73e488c30a072',
      time: Date.now(),
      data: [
        [762, [51.339764, 12.339223833333334, 1.2038]],
        [1766, [51.33977733333333, 12.339211833333334, 1.531604]],
      ],
    };

    this.logger.log(`Sending X-Ray Data: ${JSON.stringify(data)}`);
    this.rabbitMQService.sendMessage('x-ray-data', data);
  }
}
