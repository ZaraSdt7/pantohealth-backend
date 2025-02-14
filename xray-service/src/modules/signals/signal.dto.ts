import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class AnalyzeSignalDto {
  @IsString()
  deviceId: string;

  @IsNumber()
  from: number;

  @IsNumber()
  to: number;

  @IsOptional()
  @IsArray()
  fields: string[];
}
