import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateTagEntity1617268711084 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
