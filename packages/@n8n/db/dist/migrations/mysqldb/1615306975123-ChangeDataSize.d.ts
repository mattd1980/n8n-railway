import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class ChangeDataSize1615306975123 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
