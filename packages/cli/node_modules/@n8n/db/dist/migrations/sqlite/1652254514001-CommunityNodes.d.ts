import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CommunityNodes1652254514001 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
