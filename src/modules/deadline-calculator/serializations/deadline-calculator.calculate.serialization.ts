import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class DeadlineCalculatorCalculateSerialization {
  @ApiProperty({
    example: faker.date.soon({ days: 5 }),
    description:
      'It represents the calculated date and time by which the reported problem or issue is expected to be resolved based on the provided parameters.    ',
    required: true,
    nullable: false,
  })
  readonly resolvedDate: Date;
}
