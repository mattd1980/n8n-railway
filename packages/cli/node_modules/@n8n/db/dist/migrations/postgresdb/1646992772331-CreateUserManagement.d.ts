import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateUserManagement1646992772331 implements ReversibleMigration {
    up({ queryRunner, tablePrefix, loadSurveyFromDisk }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
