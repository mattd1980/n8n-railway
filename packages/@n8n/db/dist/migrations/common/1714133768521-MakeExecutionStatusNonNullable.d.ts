import type { IrreversibleMigration, MigrationContext } from '../migration-types';
export declare class MakeExecutionStatusNonNullable1714133768521 implements IrreversibleMigration {
    up({ escape, runQuery, schemaBuilder }: MigrationContext): Promise<void>;
}
