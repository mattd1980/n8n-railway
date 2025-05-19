import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class ExecutionSoftDelete1693491613982 implements ReversibleMigration {
    up({ schemaBuilder: { addColumns, column, createIndex } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropColumns, dropIndex } }: MigrationContext): Promise<void>;
}
