import type { ColumnOptions } from '@n8n/typeorm';
export declare const dbType: "sqlite" | "mariadb" | "mysqldb" | "postgresdb";
export declare const jsonColumnType: string;
export declare const datetimeColumnType: string;
export declare function JsonColumn(options?: Omit<ColumnOptions, 'type'>): PropertyDecorator;
export declare function DateTimeColumn(options?: Omit<ColumnOptions, 'type'>): PropertyDecorator;
declare class BaseEntity {
}
export declare const WithStringId: {
    new (...args: any[]): {
        id: string;
        generateId(): void;
    };
} & typeof BaseEntity;
export declare const WithTimestamps: {
    new (...args: any[]): {
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    };
} & typeof BaseEntity;
export declare const WithTimestampsAndStringId: {
    new (...args: any[]): {
        id: string;
        generateId(): void;
    };
} & {
    new (...args: any[]): {
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    };
} & typeof BaseEntity;
export {};
