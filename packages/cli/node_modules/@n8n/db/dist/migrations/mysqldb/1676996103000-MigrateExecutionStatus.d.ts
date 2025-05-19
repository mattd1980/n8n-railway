import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class MigrateExecutionStatus1676996103000 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
