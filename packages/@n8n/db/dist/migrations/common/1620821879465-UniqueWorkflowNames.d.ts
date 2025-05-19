import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class UniqueWorkflowNames1620821879465 implements ReversibleMigration {
    protected indexSuffix: string;
    up({ isMysql, escape, runQuery }: MigrationContext): Promise<void>;
    down({ isMysql, escape, runQuery }: MigrationContext): Promise<void>;
}
