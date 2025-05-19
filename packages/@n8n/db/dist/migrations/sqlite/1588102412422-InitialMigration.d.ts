import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class InitialMigration1588102412422 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
