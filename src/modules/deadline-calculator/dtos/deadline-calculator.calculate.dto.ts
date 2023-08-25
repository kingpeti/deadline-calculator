import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { IsValidDateValue } from 'src/common/request/validations/request.is-valid-date-value.validation';
import { IsValidWorkingHour } from 'src/common/request/validations/request.is-valid-working-hour.validation';

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
  @IsValidDateValue()
  @IsValidWorkingHour()
  readonly submitDate: string | Date | number;
}
