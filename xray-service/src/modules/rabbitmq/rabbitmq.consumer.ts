import { Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { XrayProccessor } from '../xray/xray.processor';

@Injectable()
export class RabbitMQConsumer {
  private readonly logger = new Logger(RabbitMQConsumer.name);
  constructor(private readonly xrayProcessor: XrayProccessor) {}
  @EventPattern('x-ray-queue')
  async handleMessage(@Payload() data: any, @Ctx() contex: RmqContext) {
    this.logger.log(`Received X-ray data: ${JSON.stringify(data)}`);
    try {
      // Here we can send the data to the Xray Service for processing and storage
      await this.xrayProcessor.processXrayData(data);

      // Acknowledge the message to the RabbitMQ queue
      const channel = contex.getChannelRef() as {
        ack: (message: string) => void;
      };
      const orgalmsg = contex.getMessage() as unknown as string;
      channel.ack(orgalmsg);
    } catch (error) {
      // Here we can handle the error and decide what to do next, for example, retrying or rejecting the message
      this.logger.error(`Failed to process X-ray data: ${error}`);
    }
  }
}
