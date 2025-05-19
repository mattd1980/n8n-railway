import * as n8n_workflow from 'n8n-workflow';
import { INodeProperties, FieldType, IExecuteFunctions, ISupplyDataFunctions, INodeExecutionData, IDataObject, INode } from 'n8n-workflow';
import { SetNodeOptions } from './helpers/interfaces.js';

declare const description: {
    displayOptions: n8n_workflow.IDisplayOptions;
    displayName: string;
    name: string;
    type: n8n_workflow.NodePropertyTypes;
    typeOptions?: n8n_workflow.INodePropertyTypeOptions;
    default: n8n_workflow.NodeParameterValueType;
    description?: string;
    hint?: string;
    disabledOptions?: n8n_workflow.IDisplayOptions;
    options?: Array<n8n_workflow.INodePropertyOptions | INodeProperties | n8n_workflow.INodePropertyCollection>;
    placeholder?: string;
    isNodeSetting?: boolean;
    noDataExpression?: boolean;
    required?: boolean;
    routing?: n8n_workflow.INodePropertyRouting;
    credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
    extractValue?: n8n_workflow.INodePropertyValueExtractor;
    modes?: n8n_workflow.INodePropertyMode[];
    requiresDataPath?: "single" | "multiple";
    doNotInherit?: boolean;
    validateType?: FieldType;
    ignoreValidationDuringExecution?: boolean;
}[];
declare function execute(this: IExecuteFunctions | ISupplyDataFunctions, item: INodeExecutionData, i: number, options: SetNodeOptions, rawFieldsData: IDataObject, node: INode): Promise<INodeExecutionData | {
    json: {
        error: string;
        pairedItem: {
            item: number;
        };
    };
}>;

export { description, execute };
