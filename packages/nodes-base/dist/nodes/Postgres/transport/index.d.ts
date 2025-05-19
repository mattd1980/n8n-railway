import { IExecuteFunctions, ICredentialTestFunctions, ILoadOptionsFunctions, ITriggerFunctions } from 'n8n-workflow';
import { PostgresNodeCredentials, PostgresNodeOptions, ConnectionsData } from '../v2/helpers/interfaces.js';
import 'pg-promise';
import 'pg-promise/typescript/pg-subset';

declare function configurePostgres(this: IExecuteFunctions | ICredentialTestFunctions | ILoadOptionsFunctions | ITriggerFunctions, credentials: PostgresNodeCredentials, options?: PostgresNodeOptions): Promise<ConnectionsData>;

export { configurePostgres };
