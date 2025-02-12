import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { XrayModule } from './xray.module';

async function bootstrap() {
  const app = await NestFactory.create(XrayModule);

  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        configService.get<string>('rabbitmq.uri') ??
          'amqp://guest:guest@localhost:5672',
      ],
      queue: configService.get<string>('rabbitmq.queue') ?? 'x-ray-queue',
      queueOptions: configService.get('rabbitmq.queueOptions'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000, () => {
    console.log('Xray Service is running on port 3000');
  });
}
 bootstrap();
