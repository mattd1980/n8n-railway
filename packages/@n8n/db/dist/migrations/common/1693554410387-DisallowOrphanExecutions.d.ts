import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class DisallowOrphanExecutions1693554410387 implements ReversibleMigration {
    up({ escape, schemaBuilder: { addNotNull }, runQuery }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropNotNull } }: MigrationContext): Promise<void>;
}
