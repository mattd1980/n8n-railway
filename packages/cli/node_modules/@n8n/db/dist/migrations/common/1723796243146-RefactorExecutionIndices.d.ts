import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class RefactorExecutionIndices1723796243146 implements ReversibleMigration {
    up({ schemaBuilder, isPostgres, isSqlite, isMysql, runQuery, escape }: MigrationContext): Promise<void>;
    down({ schemaBuilder }: MigrationContext): Promise<void>;
}
