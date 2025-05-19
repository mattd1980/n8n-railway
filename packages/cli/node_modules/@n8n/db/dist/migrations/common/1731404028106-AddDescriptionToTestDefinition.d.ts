import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddDescriptionToTestDefinition1731404028106 implements ReversibleMigration {
    up({ schemaBuilder: { addColumns, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropColumns } }: MigrationContext): Promise<void>;
}
