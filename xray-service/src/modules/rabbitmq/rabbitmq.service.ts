import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

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
        queueOptions: this.configService.get('rabbitmq.queueOptions') as {
          durable: boolean;
        },
      },
    });
    this.logger.log('Connected to RabbitMQ');
  }

  sendMessage(pattern: string, message: any): Observable<any> {
    this.logger.log(
      `Sending message to ${pattern}: ${JSON.stringify(message)}`,
    );
    return this.client.send(pattern, message);
  }
}

// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import {
//   ClientProxy,
//   ClientProxyFactory,
//   Transport,
// } from '@nestjs/microservices';

// @Injectable()
// export class RabbitMQService implements OnModuleInit {
//   constructor(
//     private client: ClientProxy,
//     private readonly logger = new Logger(RabbitMQService.name),
//   ) {}

//   onModuleInit() {
//     this.client = ClientProxyFactory.create({
//       transport: Transport.RMQ,
//       options: {
//         urls: ['amqp://guest:guest@rabbitmq:5672'],
//         queue: 'x-ray-queue',
//         queueOptions: {
//           durable: true,
//         },
//       },
//     });
//     this.logger.log('RabbitMQService is ready');
//   }

//   sendMessage(pattern: string, message: string) {
//     try {
//       this.logger.log(
//         `Sending message to ${pattern}: ${JSON.stringify(message)}`,
//       );
//       return this.client.send(pattern, message);
//     } catch (error) {
//       this.logger.error(`Failed to send message: ${error}`);
//       throw error;
//     }
//   }
// }
