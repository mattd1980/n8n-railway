import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateVariables1677501636753 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
