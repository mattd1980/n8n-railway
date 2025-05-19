import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateAnnotationTables1724753530828 implements ReversibleMigration {
    up({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
