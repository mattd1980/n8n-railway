import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateWorkflowsEditorRole1663755770893 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
