import type { QueryRunner } from '@n8n/typeorm';
import { Column } from './column';
import { CreateIndex, DropIndex } from './indices';
import { AddColumns, AddForeignKey, AddNotNull, CreateTable, DropColumns, DropForeignKey, DropNotNull, DropTable } from './table';
export declare const createSchemaBuilder: (tablePrefix: string, queryRunner: QueryRunner) => {
    column: (name: string) => Column;
    createTable: (tableName: string) => CreateTable;
    dropTable: (tableName: string) => DropTable;
    addColumns: (tableName: string, columns: Column[]) => AddColumns;
    dropColumns: (tableName: string, columnNames: string[]) => DropColumns;
    createIndex: (tableName: string, columnNames: string[], isUnique?: boolean, customIndexName?: string) => CreateIndex;
    dropIndex: (tableName: string, columnNames: string[], { customIndexName, skipIfMissing }?: {
        customIndexName?: string;
        skipIfMissing?: boolean;
    }) => DropIndex;
    addForeignKey: (tableName: string, columnName: string, reference: [string, string], customConstraintName?: string) => AddForeignKey;
    dropForeignKey: (tableName: string, columnName: string, reference: [string, string], customConstraintName?: string) => DropForeignKey;
    addNotNull: (tableName: string, columnName: string) => AddNotNull;
    dropNotNull: (tableName: string, columnName: string) => DropNotNull;
};
