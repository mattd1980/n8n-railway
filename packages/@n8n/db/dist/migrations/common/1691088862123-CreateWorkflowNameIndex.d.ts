import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateWorkflowNameIndex1691088862123 implements ReversibleMigration {
    up({ schemaBuilder: { createIndex } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropIndex } }: MigrationContext): Promise<void>;
}
