import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class MakeStoppedAtNullable1607431743767 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
