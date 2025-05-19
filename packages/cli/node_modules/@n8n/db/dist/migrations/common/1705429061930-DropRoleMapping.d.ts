import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class DropRoleMapping1705429061930 implements ReversibleMigration {
    up(context: MigrationContext): Promise<void>;
    down(context: MigrationContext): Promise<void>;
    private migrateUp;
    private migrateDown;
}
