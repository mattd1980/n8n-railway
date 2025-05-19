import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddProjectIcons1729607673469 implements ReversibleMigration {
    up({ schemaBuilder: { addColumns, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropColumns } }: MigrationContext): Promise<void>;
}
