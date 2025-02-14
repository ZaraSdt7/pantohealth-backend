import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { XrayServiceModule } from './xray-service.module';
import { AllExceptionsFilter } from './modules/common/exceptions.filter';
import { setupSwagger } from './config/swagger/xray-swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(XrayServiceModule);

  const configService = app.get(ConfigService);
  setupSwagger(
    app,
    'Xray Service API',
    'API documentation for X-ray data management and signal analysis',
  );
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
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.startAllMicroservices();
  await app.listen(3000, () => {
    console.log('Xray Service is running on port 3000');
  });
}
void bootstrap();
