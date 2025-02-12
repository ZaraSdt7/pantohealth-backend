import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
  uri: process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
  queue: 'x-ray-queue',
  queueOptions: {
    durable: true,
  },
}));
