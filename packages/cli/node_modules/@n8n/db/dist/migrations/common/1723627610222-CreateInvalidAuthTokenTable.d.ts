import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateInvalidAuthTokenTable1723627610222 implements ReversibleMigration {
    up({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
