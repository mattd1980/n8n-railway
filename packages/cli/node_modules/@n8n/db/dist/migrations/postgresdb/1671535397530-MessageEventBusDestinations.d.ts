import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class MessageEventBusDestinations1671535397530 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
