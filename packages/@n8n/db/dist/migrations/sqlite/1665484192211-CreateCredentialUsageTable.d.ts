import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateCredentialUsageTable1665484192211 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
