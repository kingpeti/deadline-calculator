import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidDateValueConstraint implements ValidatorConstraintInterface {
  validate(value: string | number | Date) {
    if (typeof value === 'string') {
      return !isNaN(Date.parse(value));
    } else if (typeof value === 'number') {
      return !isNaN(value);
    } else if (value instanceof Date) {
      return !isNaN(value.getTime());
    }
    return false;
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid date string, number, or Date object.`;
  }
}

export function IsValidDateValue(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): any {
    registerDecorator({
      name: 'IsValidDateValue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateValueConstraint,
    });
  };
}
