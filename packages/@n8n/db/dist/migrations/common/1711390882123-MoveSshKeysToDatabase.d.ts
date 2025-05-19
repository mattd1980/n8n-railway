import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class MoveSshKeysToDatabase1711390882123 implements ReversibleMigration {
    private readonly settingsKey;
    private readonly privateKeyPath;
    private readonly publicKeyPath;
    private readonly cipher;
    up({ escape, runQuery, logger, migrationName }: MigrationContext): Promise<void>;
    down({ escape, runQuery, logger, migrationName }: MigrationContext): Promise<void>;
}
