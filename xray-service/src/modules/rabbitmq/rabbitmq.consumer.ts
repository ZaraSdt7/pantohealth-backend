import { Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class RabbitMQConsumer {
  constructor(private readonly logger = new Logger(RabbitMQConsumer.name)) {}

  @EventPattern('x-ray-queue')
  handleMessage(@Payload() data: any, @Ctx() contex: RmqContext) {
    try {
      this.logger.log(`Received X-ray data: ${JSON.stringify(data)}`);
      // Here we can send the data to the Xray Service for processing and storage
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
