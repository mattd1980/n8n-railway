import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddManagedColumnToCredentialsTable1734479635324 implements ReversibleMigration {
    up({ escape, runQuery, isSqlite }: MigrationContext): Promise<void>;
    down({ escape, runQuery }: MigrationContext): Promise<void>;
}
