import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddWorkflowVersionIdColumn1669739707124 implements ReversibleMigration {
    up({ escape, runQuery }: MigrationContext): Promise<void>;
    down({ escape, runQuery }: MigrationContext): Promise<void>;
}
