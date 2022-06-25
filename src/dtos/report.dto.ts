import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  source: string;
}

export class ReportResponse {
  constructor(partial: Partial<ReportResponse>) {
    Object.assign(this, partial);
  }
  id: string;

  source: string;

  amount: number;

  @Exclude()
  created_at: Date;
  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  @Exclude()
  updated_at: Date;

  type: ReportType;
}
