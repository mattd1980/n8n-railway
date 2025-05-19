import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddwaitTill1626176912946 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
