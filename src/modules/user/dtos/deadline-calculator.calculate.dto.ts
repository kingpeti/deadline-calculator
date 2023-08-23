import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class DeadlineCalculatorCalculateDto {
  @ApiProperty({
    description:
      "It represents the amount of time required to resolve an issue or problem, and it's specified in terms of working hours.",
    example: faker.number.int({ min: 1, max: 100 }),
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly turnaroundHours: number;

  @ApiProperty({
    description: 'It represents the date and time when a problem or issue is reported or submitted.',
    example: faker.date.recent(),
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsDate()
  readonly submitDate: Date;
}
