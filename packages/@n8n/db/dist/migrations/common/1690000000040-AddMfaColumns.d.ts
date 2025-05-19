import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddMfaColumns1690000000030 implements ReversibleMigration {
    up({ schemaBuilder: { addColumns, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropColumns } }: MigrationContext): Promise<void>;
}
