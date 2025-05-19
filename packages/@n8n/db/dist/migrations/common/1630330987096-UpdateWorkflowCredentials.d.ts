import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class UpdateWorkflowCredentials1630330987096 implements ReversibleMigration {
    up({ dbType, escape, parseJson, runQuery, runInBatches }: MigrationContext): Promise<void>;
    down({ dbType, escape, parseJson, runQuery, runInBatches }: MigrationContext): Promise<void>;
}
