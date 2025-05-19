import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class WorkflowStatistics1664196174001 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
