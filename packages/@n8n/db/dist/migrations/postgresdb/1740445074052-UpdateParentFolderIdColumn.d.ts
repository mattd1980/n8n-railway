import type { BaseMigration, MigrationContext } from '../migration-types';
export declare class UpdateParentFolderIdColumn1740445074052 implements BaseMigration {
    up({ escape, queryRunner, schemaBuilder: { dropForeignKey }, tablePrefix, }: MigrationContext): Promise<void>;
}
