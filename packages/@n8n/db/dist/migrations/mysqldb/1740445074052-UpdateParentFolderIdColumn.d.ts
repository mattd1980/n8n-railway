import type { BaseMigration, MigrationContext } from '../migration-types';
export declare class UpdateParentFolderIdColumn1740445074052 implements BaseMigration {
    up({ escape, queryRunner }: MigrationContext): Promise<void>;
}
