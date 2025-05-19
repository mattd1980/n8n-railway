import type { QueryRunner } from '@n8n/typeorm';
import { TableForeignKey } from '@n8n/typeorm';
import LazyPromise from 'p-lazy';
import { Column } from './column';
declare abstract class TableOperation<R = void> extends LazyPromise<R> {
    protected tableName: string;
    protected prefix: string;
    abstract execute(queryRunner: QueryRunner): Promise<R>;
    constructor(tableName: string, prefix: string, queryRunner: QueryRunner);
}
export declare class CreateTable extends TableOperation {
    private columns;
    private indices;
    private foreignKeys;
    withColumns(...columns: Column[]): this;
    get withTimestamps(): this;
    withIndexOn(columnName: string | string[], isUnique?: boolean): this;
    withForeignKey(columnName: string, ref: {
        tableName: string;
        columnName: string;
        onDelete?: 'RESTRICT' | 'CASCADE' | 'NO ACTION' | 'SET NULL';
        onUpdate?: 'RESTRICT' | 'CASCADE' | 'NO ACTION' | 'SET NULL';
        name?: string;
    }): this;
    execute(queryRunner: QueryRunner): Promise<void>;
}
export declare class DropTable extends TableOperation {
    execute(queryRunner: QueryRunner): Promise<void>;
}
export declare class AddColumns extends TableOperation {
    protected columns: Column[];
    constructor(tableName: string, columns: Column[], prefix: string, queryRunner: QueryRunner);
    execute(queryRunner: QueryRunner): Promise<void>;
}
export declare class DropColumns extends TableOperation {
    protected columnNames: string[];
    constructor(tableName: string, columnNames: string[], prefix: string, queryRunner: QueryRunner);
    execute(queryRunner: QueryRunner): Promise<void>;
}
declare abstract class ForeignKeyOperation extends TableOperation {
    protected foreignKey: TableForeignKey;
    constructor(tableName: string, columnName: string, [referencedTableName, referencedColumnName]: [string, string], prefix: string, queryRunner: QueryRunner, customConstraintName?: string);
}
export declare class AddForeignKey extends ForeignKeyOperation {
    execute(queryRunner: QueryRunner): Promise<void>;
}
export declare class DropForeignKey extends ForeignKeyOperation {
    execute(queryRunner: QueryRunner): Promise<void>;
}
declare class ModifyNotNull extends TableOperation {
    protected columnName: string;
    protected isNullable: boolean;
    constructor(tableName: string, columnName: string, isNullable: boolean, prefix: string, queryRunner: QueryRunner);
    execute(queryRunner: QueryRunner): Promise<void>;
}
export declare class AddNotNull extends ModifyNotNull {
    protected columnName: string;
    constructor(tableName: string, columnName: string, prefix: string, queryRunner: QueryRunner);
}
export declare class DropNotNull extends ModifyNotNull {
    protected columnName: string;
    constructor(tableName: string, columnName: string, prefix: string, queryRunner: QueryRunner);
}
export {};
