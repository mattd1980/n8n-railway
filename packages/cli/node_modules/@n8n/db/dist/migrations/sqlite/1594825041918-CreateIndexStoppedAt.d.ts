import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateIndexStoppedAt1594825041918 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
