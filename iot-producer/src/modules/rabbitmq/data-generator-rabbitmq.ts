import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface IXRayData {
  deviceId: string;
  time: number;
  data: Array<[number, [number, number, number]]>;
}

@Injectable()
export class DataGenerator {
  private readonly baseX = 51.339764;
  private readonly baseY = 12.339223;

  private generateDeviceId(): string {
    return uuidv4();
  }

  private generateCoordinates(): [number, number] {
    const x = this.baseX + Math.random() * 0.001;
    const y = this.baseY + Math.random() * 0.001;
    return [x, y];
  }

  private generateSpeed(): number {
    return parseFloat((Math.random() * 5).toFixed(2));
  }

  private generateTime(): number {
    return Math.floor(Math.random() * 1000);
  }

  public generateXRayData(): IXRayData {
    const deviceId = this.generateDeviceId();
    const data = Array.from({ length: 3 }, () => {
      const time = this.generateTime();
      const [x, y] = this.generateCoordinates();
      const speed = this.generateSpeed();
      return [time, [x, y, speed]] as [number, [number, number, number]];
    });

    return {
      deviceId,
      time: Date.now(),
      data,
    };
  }
}
