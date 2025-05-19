import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class ChangeCredentialDataSize1620729500000 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
