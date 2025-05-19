import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateLdapEntities1674509946020 implements ReversibleMigration {
    up({ escape, dbType, isMysql, runQuery }: MigrationContext): Promise<void>;
    down({ escape, runQuery }: MigrationContext): Promise<void>;
}
