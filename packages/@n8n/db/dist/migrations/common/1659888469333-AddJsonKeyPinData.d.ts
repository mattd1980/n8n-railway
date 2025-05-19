import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class AddJsonKeyPinData1659888469333 implements IrreversibleMigration {
    up({ escape, runQuery, runInBatches }: MigrationContext): Promise<void>;
    private makeUpdateParams;
}
