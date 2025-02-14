import { v4 as uuidv4 } from 'uuid';

export class DataGenerator {
  // Generate a unique and constant Device ID during emulator execution
  private deviceId = uuidv4();

  // Starting from a random starting point
  private currentCoordinates = {
    x: +(51.339 + (Math.random() - 0.5) * 0.01).toFixed(6),
    y: +(12.339 + (Math.random() - 0.5) * 0.01).toFixed(6),
  };

  // Initial time as actual timestamp
  private baseTime = Date.now();

  // X-ray data generation
  generateXRayData() {
    const speedRange = {
      min: 1.0,
      max: 3.0,
    };

    const data: [number, [number, number, number]][] = [];

    for (let i = 0; i < 3; i++) {
      // Generating time incrementally and proportionally to real time
      this.baseTime += Math.floor(Math.random() * 1000) + 500;

      // Consistent and uniform changes for coordinates (X, Y)
      const xChange = (Math.random() - 0.5) * 0.0001;
      const yChange = (Math.random() - 0.5) * 0.0001;

      this.currentCoordinates.x = +(
        this.currentCoordinates.x + xChange
      ).toFixed(6);
      this.currentCoordinates.y = +(
        this.currentCoordinates.y + yChange
      ).toFixed(6);

      // Generate speed randomly within a specified range
      const speed = +(
        Math.random() * (speedRange.max - speedRange.min) +
        speedRange.min
      ).toFixed(6);

      // Add data
      data.push([
        this.baseTime,
        [this.currentCoordinates.x, this.currentCoordinates.y, speed],
      ]);
    }

    // Final structure of the X-ray message according to the project analysis example
    return {
      [this.deviceId]: {
        data: data,
        time: Date.now(),
      },
    };
  }
}
