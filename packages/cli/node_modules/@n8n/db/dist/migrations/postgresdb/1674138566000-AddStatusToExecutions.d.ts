import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddStatusToExecutions1674138566000 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
