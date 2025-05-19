import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddExecutionEntityIndexes1644424784709 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
