import type { ReversibleMigration, MigrationContext } from '../migration-types';
export declare class AddWorkflowStatisticsRootCount1745587087521 implements ReversibleMigration {
    up({ escape, runQuery }: MigrationContext): Promise<void>;
    down({ escape, runQuery }: MigrationContext): Promise<void>;
}
