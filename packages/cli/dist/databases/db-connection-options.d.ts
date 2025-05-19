import { DatabaseConfig, InstanceSettingsConfig } from '@n8n/config';
import type { DataSourceOptions } from '@n8n/typeorm';
export declare class DbConnectionOptions {
    private readonly config;
    private readonly instanceSettingsConfig;
    constructor(config: DatabaseConfig, instanceSettingsConfig: InstanceSettingsConfig);
    getOverrides(dbType: 'postgresdb' | 'mysqldb'): {
        database: string;
        host: string;
        port: number;
        username: string;
        password: string;
    };
    getOptions(): DataSourceOptions;
    private getCommonOptions;
    private getSqliteConnectionOptions;
    private getPostgresConnectionOptions;
    private getMysqlConnectionOptions;
}
