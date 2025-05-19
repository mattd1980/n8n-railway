import type { IrreversibleMigration, MigrationContext } from '../migration-types';
export declare class RemoveNodesAccess1712044305787 implements IrreversibleMigration {
    up({ schemaBuilder: { dropColumns } }: MigrationContext): Promise<void>;
}
