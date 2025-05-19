import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddWorkflowMetadata1695128658538 implements ReversibleMigration {
    up({ schemaBuilder: { addColumns, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropColumns } }: MigrationContext): Promise<void>;
}
