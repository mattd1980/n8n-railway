import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class UpdateRunningExecutionStatus1677236854063 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
