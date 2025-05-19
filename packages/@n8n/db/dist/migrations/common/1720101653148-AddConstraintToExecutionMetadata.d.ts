import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class AddConstraintToExecutionMetadata1720101653148 implements ReversibleMigration {
    up(context: MigrationContext): Promise<void>;
    down(context: MigrationContext): Promise<void>;
}
