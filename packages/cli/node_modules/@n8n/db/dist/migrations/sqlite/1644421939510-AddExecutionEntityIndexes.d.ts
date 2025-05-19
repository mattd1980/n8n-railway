import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddExecutionEntityIndexes1644421939510 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
