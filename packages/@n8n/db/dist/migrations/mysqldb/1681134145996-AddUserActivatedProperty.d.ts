import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddUserActivatedProperty1681134145996 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
