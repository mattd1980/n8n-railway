import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class IntroducePinData1654090467022 implements ReversibleMigration {
    up({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
    down({ queryRunner, tablePrefix }: MigrationContext): Promise<void>;
}
