import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddWaitColumn1621707690587 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
