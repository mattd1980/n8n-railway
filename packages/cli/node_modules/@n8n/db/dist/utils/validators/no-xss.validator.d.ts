import type { ValidationOptions } from 'class-validator';
export declare function NoXss(options?: ValidationOptions): (object: object, propertyName: string) => void;
