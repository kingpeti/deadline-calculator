import { faker } from '@faker-js/faker';

export const DeadlineCalculatorDocQueryIsActive = [
  {
    name: 'isActive',
    allowEmptyValue: true,
    required: false,
    type: 'string',
    example: 'true,false',
    description: "boolean value with ',' delimiter",
  },
];

export const DeadlineCalculatorDocQueryBlocked = [
  {
    name: 'blocked',
    allowEmptyValue: true,
    required: false,
    type: 'string',
    example: 'true,false',
    description: "boolean value with ',' delimiter",
  },
];

export const DeadlineCalculatorDocQueryInactivePermanent = [
  {
    name: 'inactivePermanent',
    allowEmptyValue: true,
    required: false,
    type: 'string',
    example: 'true,false',
    description: "boolean value with ',' delimiter",
  },
];

export const DeadlineCalculatorDocQueryRole = [
  {
    name: 'role',
    allowEmptyValue: true,
    required: false,
    type: 'string',
    example: faker.string.uuid(),
  },
];

export const DeadlineCalculatorDocParamsId = [
  {
    name: 'deadlineCalculator',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.string.uuid(),
  },
];
