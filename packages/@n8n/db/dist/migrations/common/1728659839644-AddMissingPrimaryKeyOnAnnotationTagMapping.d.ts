import type { IrreversibleMigration, MigrationContext } from '../migration-types';
export declare class AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644 implements IrreversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
