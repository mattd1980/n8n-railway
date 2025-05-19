import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class LowerCaseUserEmail1648740597343 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
