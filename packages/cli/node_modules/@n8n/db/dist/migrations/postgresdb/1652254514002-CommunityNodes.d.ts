import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CommunityNodes1652254514002 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
