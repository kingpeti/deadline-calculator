import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class RequestPaginationSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.person.firstName(),
  })
  search: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: {},
  })
  filters: Record<string, string | number | boolean | Array<string | number | boolean>>;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 1,
  })
  page: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 'createdAt',
  })
  orderBy: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: ['name'],
  })
  availableSearch: string[];

  @ApiProperty({
    required: true,
    nullable: false,
    example: ['name', 'createdAt'],
  })
  availableOrderBy: string[];
}
