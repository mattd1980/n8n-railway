import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class FixTestDefinitionPrimaryKey1739873751194 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
