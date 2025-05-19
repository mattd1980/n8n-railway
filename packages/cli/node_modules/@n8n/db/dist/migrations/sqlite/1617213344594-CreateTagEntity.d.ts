import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateTagEntity1617213344594 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
