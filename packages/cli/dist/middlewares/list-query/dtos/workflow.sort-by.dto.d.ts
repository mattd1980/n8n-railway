import type { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class WorkflowSortByParameter implements ValidatorConstraintInterface {
    validate(text: string, _: ValidationArguments): boolean;
    defaultMessage(_: ValidationArguments): string;
}
export declare class WorkflowSorting {
    sortBy?: string;
}
