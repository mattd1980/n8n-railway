import type { QueryRunner } from '@n8n/typeorm';
import LazyPromise from 'p-lazy';
declare abstract class IndexOperation extends LazyPromise<void> {
    protected tableName: string;
    protected columnNames: string[];
    protected tablePrefix: string;
    protected customIndexName?: string | undefined;
    abstract execute(queryRunner: QueryRunner): Promise<void>;
    get fullTableName(): string;
    get fullIndexName(): string;
    constructor(tableName: string, columnNames: string[], tablePrefix: string, queryRunner: QueryRunner, customIndexName?: string | undefined);
}
export declare class CreateIndex extends IndexOperation {
    protected isUnique: boolean;
    constructor(tableName: string, columnNames: string[], isUnique: boolean, tablePrefix: string, queryRunner: QueryRunner, customIndexName?: string);
    execute(queryRunner: QueryRunner): Promise<void>;
}
export declare class DropIndex extends IndexOperation {
    protected skipIfMissing: boolean;
    constructor(tableName: string, columnNames: string[], tablePrefix: string, queryRunner: QueryRunner, customIndexName?: string, skipIfMissing?: boolean);
    execute(queryRunner: QueryRunner): Promise<void>;
}
export {};
