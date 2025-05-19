import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class IncreaseTypeVarcharLimit1646834195327 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
