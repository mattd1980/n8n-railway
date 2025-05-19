import { SSHCredentials, IDataObject, INodeExecutionData } from 'n8n-workflow';
import pgPromise, { IFormattingOptions } from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';

type QueryMode = 'single' | 'transaction' | 'independently';
type QueryValue = string | number | IDataObject | string[];
type QueryValues = QueryValue[];
type QueryWithValues = {
    query: string;
    values?: QueryValues;
    options?: IFormattingOptions;
};
type WhereClause = {
    column: string;
    condition: string;
    value: string | number;
};
type SortRule = {
    column: string;
    direction: string;
};
type ColumnInfo = {
    column_name: string;
    data_type: string;
    is_nullable: string;
    udt_name?: string;
    column_default?: string | null;
    is_generated?: 'ALWAYS' | 'NEVER';
    identity_generation?: 'ALWAYS' | 'NEVER';
};
type EnumInfo = {
    typname: string;
    enumlabel: string;
};
type PgpClient = pgPromise.IMain<{}, pg.IClient>;
type PgpDatabase = pgPromise.IDatabase<{}, pg.IClient>;
type PgpConnectionParameters = pg.IConnectionParameters<pg.IClient>;
type PgpConnection = pgPromise.IConnected<{}, pg.IClient>;
type ConnectionsData = {
    db: PgpDatabase;
    pgp: PgpClient;
};
type QueriesRunner = (queries: QueryWithValues[], items: INodeExecutionData[], options: IDataObject) => Promise<INodeExecutionData[]>;
type PostgresNodeOptions = {
    nodeVersion?: number;
    operation?: string;
    cascade?: boolean;
    connectionTimeout?: number;
    delayClosingIdleConnection?: number;
    queryBatching?: QueryMode;
    queryReplacement?: string;
    outputColumns?: string[];
    largeNumbersOutput?: 'numbers' | 'text';
    skipOnConflict?: boolean;
    replaceEmptyStrings?: boolean;
    treatQueryParametersInSingleQuotesAsText?: boolean;
};
type PostgresNodeCredentials = {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    maxConnections: number;
    allowUnauthorizedCerts?: boolean;
    ssl?: 'disable' | 'allow' | 'require' | 'verify' | 'verify-full';
} & ({
    sshTunnel: false;
} | ({
    sshTunnel: true;
} & SSHCredentials));

export type { ColumnInfo, ConnectionsData, EnumInfo, PgpClient, PgpConnection, PgpConnectionParameters, PgpDatabase, PostgresNodeCredentials, PostgresNodeOptions, QueriesRunner, QueryMode, QueryValue, QueryValues, QueryWithValues, SortRule, WhereClause };
