import { registerAs } from '@nestjs/config';

export default registerAs('simulator', () => ({
  interval: parseInt(process.env.SIMULATOR_INTERVAL ?? '', 10) || 5000,
}));
