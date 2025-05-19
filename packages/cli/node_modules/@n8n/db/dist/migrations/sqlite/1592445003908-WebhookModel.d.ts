import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class WebhookModel1592445003908 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
