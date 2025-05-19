import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddAPIKeyColumn1652905585850 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
