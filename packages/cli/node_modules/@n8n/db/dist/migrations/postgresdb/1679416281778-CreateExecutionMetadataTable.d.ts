import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateExecutionMetadataTable1679416281778 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
