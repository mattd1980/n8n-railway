import type { MigrationContext, ReversibleMigration } from '../migration-types';
type RelationTable = 'shared_workflow' | 'shared_credentials';
export declare class CreateProject1714133768519 implements ReversibleMigration {
    setupTables({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    alterSharedTable(relationTableName: RelationTable, { escape, isMysql, runQuery, schemaBuilder: { addForeignKey, addColumns, addNotNull, createIndex, column }, }: MigrationContext): Promise<void>;
    alterSharedCredentials({ escape, runQuery, schemaBuilder: { column, createTable, dropTable }, }: MigrationContext): Promise<void>;
    alterSharedWorkflow({ escape, runQuery, schemaBuilder: { column, createTable, dropTable }, }: MigrationContext): Promise<void>;
    createUserPersonalProjects({ runQuery, runInBatches, escape }: MigrationContext): Promise<void>;
    createPersonalProjectName(firstName?: string, lastName?: string, email?: string): string;
    up(context: MigrationContext): Promise<void>;
    down({ isMysql, logger, escape, runQuery, schemaBuilder: sb }: MigrationContext): Promise<void>;
}
export {};
