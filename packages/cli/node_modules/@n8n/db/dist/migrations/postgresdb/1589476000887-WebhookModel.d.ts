import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class WebhookModel1589476000887 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
