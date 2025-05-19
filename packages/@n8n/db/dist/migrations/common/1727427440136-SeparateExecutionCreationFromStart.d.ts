import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class SeparateExecutionCreationFromStart1727427440136 implements ReversibleMigration {
    up({ schemaBuilder: { addColumns, column, dropNotNull }, runQuery, escape, }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropColumns, addNotNull } }: MigrationContext): Promise<void>;
}
