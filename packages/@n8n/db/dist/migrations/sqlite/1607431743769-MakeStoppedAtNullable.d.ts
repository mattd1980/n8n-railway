import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class MakeStoppedAtNullable1607431743769 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
