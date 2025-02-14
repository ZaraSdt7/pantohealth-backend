import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  port: parseInt(process.env.PORT ?? '0', 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  rabbitmqUri: process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
}));
