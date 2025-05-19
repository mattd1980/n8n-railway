import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class UpdateRunningExecutionStatus1677237073720 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
