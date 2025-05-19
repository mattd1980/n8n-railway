import type { IrreversibleMigration, MigrationContext } from '../migration-types';
export declare class AddMissingPrimaryKeyOnExecutionData1690787606731 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
