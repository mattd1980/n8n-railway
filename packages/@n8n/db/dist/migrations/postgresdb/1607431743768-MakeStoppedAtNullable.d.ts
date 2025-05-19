import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class MakeStoppedAtNullable1607431743768 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
