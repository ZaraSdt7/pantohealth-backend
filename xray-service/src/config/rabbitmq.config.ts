import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
  uri: process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
  queue: 'x-ray-queue',
  queueOptions: {
    durable: true,
  },
}));

// class rabbitMQConfig {
//   url: string = process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672';
//   queue: string = 'x-ray-queue';
//   queueOptions: {
//     durable: boolean;
//   } = {
//     durable: true,
//   };
// }
// export default new rabbitMQConfig();
