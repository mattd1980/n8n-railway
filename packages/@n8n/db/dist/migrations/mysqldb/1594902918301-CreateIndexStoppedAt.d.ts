import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateIndexStoppedAt1594902918301 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
