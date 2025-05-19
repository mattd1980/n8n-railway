import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddMockedNodesColumnToTestDefinition1733133775640 implements ReversibleMigration {
    up({ escape, runQuery }: MigrationContext): Promise<void>;
    down({ escape, runQuery }: MigrationContext): Promise<void>;
}
