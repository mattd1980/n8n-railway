import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class FixExecutionDataType1690000000031 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
