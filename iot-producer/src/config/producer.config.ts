import { registerAs } from '@nestjs/config';

export default registerAs('producer', () => ({
  interval: parseInt(process.env.PRODUCER_INTERVAL ?? '', 10) || 5000,
  messageFormat: process.env.RABBITMQ_QUEUE || 'x-ray-data',
}));
