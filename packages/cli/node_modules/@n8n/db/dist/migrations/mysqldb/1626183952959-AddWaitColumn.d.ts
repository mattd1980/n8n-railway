import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddWaitColumnId1626183952959 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
