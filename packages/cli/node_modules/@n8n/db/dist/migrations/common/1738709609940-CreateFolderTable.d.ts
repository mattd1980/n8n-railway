import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateFolderTable1738709609940 implements ReversibleMigration {
    up({ runQuery, escape, schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ runQuery, escape, schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
