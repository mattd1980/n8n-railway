import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class InitialMigration1588157391238 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
