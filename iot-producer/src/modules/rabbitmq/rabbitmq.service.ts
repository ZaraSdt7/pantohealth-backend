import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private client: ClientProxy;
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      options: {
        transport: {
          type: Transport.RMQ,
        },
        urls: [this.configService.get<string>('rabbitmq.uri')],
        queue: this.configService.get<string>('rabbitmq.queue'),
        queueOptions: this.configService.get('rabbitmq.queueOptions'),
      },
    });
    this.logger.log('Connected to RabbitMQ');
  }

  sendMessage(pattern: string, message: any) {
    this.logger.log(
      `Sending message to ${pattern}: ${JSON.stringify(message)}`,
    );
    return this.client.emit(pattern, message);
  }
}
