import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { RabbitMQProducer } from './modules/rabbitmq/rabbitmq.producer';
import { IotProducerModule } from './iot-producer.module';
import { setupSwagger } from './config/swagger/iot-swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(IotProducerModule);

  const configService = app.get(ConfigService);
  console.log(
    `Connected to RabbitMQ: ${configService.get<string>('rabbitmq.uri')}`,
  );

  //setup the swagger
  setupSwagger(
    app,
    'IoT Producer API',
    'API documentation for IoT data simulator',
  );
  // Start sending simulated X-ray messages
  const producer = app.get<RabbitMQProducer>(RabbitMQProducer);
  setInterval(() => {
    producer.sendXRayData();
  }, 5000); // Send a message every 5 seconds.

  await app.listen(3001, () => {
    console.log('IoT Producer is running on port 3001');
  });
}
void bootstrap();
