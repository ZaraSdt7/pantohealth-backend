import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: process.env.PORT || 3000,
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/xray-db',
  nodeEnv: process.env.NODE_ENV || 'development',
}));
