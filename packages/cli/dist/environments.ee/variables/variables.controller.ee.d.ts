import { VariableListRequestDto } from '@n8n/api-types';
import { VariablesRequest } from '../../requests';
import { VariablesService } from './variables.service.ee';
export declare class VariablesController {
    private readonly variablesService;
    constructor(variablesService: VariablesService);
    getVariables(_req: unknown, _res: unknown, query: VariableListRequestDto): Promise<import("@n8n/db").Variables[]>;
    createVariable(req: VariablesRequest.Create): Promise<import("@n8n/db").Variables>;
    getVariable(req: VariablesRequest.Get): Promise<import("@n8n/db").Variables>;
    updateVariable(req: VariablesRequest.Update): Promise<import("@n8n/db").Variables>;
    deleteVariable(req: VariablesRequest.Delete): Promise<boolean>;
}
