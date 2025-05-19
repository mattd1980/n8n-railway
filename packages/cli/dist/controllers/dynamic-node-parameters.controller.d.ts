import { OptionsRequestDto, ResourceLocatorRequestDto, ResourceMapperFieldsRequestDto, ActionResultRequestDto } from '@n8n/api-types';
import type { INodePropertyOptions, NodeParameterValueType } from 'n8n-workflow';
import { AuthenticatedRequest } from '../requests';
import { DynamicNodeParametersService } from '../services/dynamic-node-parameters.service';
export declare class DynamicNodeParametersController {
    private readonly service;
    constructor(service: DynamicNodeParametersService);
    getOptions(req: AuthenticatedRequest, _res: Response, payload: OptionsRequestDto): Promise<INodePropertyOptions[]>;
    getResourceLocatorResults(req: AuthenticatedRequest, _res: Response, payload: ResourceLocatorRequestDto): Promise<import("n8n-workflow").INodeListSearchResult>;
    getResourceMappingFields(req: AuthenticatedRequest, _res: Response, payload: ResourceMapperFieldsRequestDto): Promise<import("n8n-workflow").ResourceMapperFields>;
    getLocalResourceMappingFields(req: AuthenticatedRequest, _res: Response, payload: ResourceMapperFieldsRequestDto): Promise<import("n8n-workflow").ResourceMapperFields>;
    getActionResult(req: AuthenticatedRequest, _res: Response, payload: ActionResultRequestDto): Promise<NodeParameterValueType>;
}
