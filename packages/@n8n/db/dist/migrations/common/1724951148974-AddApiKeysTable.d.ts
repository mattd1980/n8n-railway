import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddApiKeysTable1724951148974 implements ReversibleMigration {
    up({ queryRunner, escape, runQuery, schemaBuilder: { createTable, column }, }: MigrationContext): Promise<void>;
    down({ queryRunner, runQuery, schemaBuilder: { dropTable, addColumns, createIndex, column }, escape, isMysql, }: MigrationContext): Promise<void>;
}
