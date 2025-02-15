import { Injectable, Logger } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { DataGenerator, IXRayData } from './data-generator-rabbitmq';

@Injectable()
export class RabbitMQProducer {
  private readonly logger = new Logger(RabbitMQProducer.name);

  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly dataGenerator: DataGenerator,
  ) {}

  sendXRayData() {
    const xrayData: IXRayData = this.dataGenerator.generateXRayData();

    this.logger.log(`Sending X-ray data: ${JSON.stringify(xrayData)}`);
    this.rabbitMQService.sendMessage('x-ray-queue', xrayData);
  }
}
