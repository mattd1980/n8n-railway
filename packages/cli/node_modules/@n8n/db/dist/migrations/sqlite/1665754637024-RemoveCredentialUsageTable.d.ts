import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class RemoveCredentialUsageTable1665754637024 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
