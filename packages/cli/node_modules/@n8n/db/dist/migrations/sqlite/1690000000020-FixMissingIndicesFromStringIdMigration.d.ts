import type { IrreversibleMigration, MigrationContext } from '../migration-types';
export declare class FixMissingIndicesFromStringIdMigration1690000000020 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
