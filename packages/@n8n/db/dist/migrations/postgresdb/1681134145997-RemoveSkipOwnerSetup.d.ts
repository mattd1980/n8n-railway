import type { IrreversibleMigration, MigrationContext } from '../migration-types';
export declare class RemoveSkipOwnerSetup1681134145997 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
