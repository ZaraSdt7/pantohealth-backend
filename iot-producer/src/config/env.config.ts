import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  port: parseInt(process.env.PORT ?? '0', 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
}));
