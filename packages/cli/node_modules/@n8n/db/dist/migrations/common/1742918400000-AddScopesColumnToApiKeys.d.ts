import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddScopesColumnToApiKeys1742918400000 implements ReversibleMigration {
    up({ runQuery, escape, queryRunner, schemaBuilder: { addColumns, column }, }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropColumns } }: MigrationContext): Promise<void>;
}
