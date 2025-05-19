import { IWorkflowNodeContext, WorkflowInputsData, FieldValueOption, IExecuteFunctions, ISupplyDataFunctions, INodeExecutionData, ILocalLoadOptionsFunctions } from 'n8n-workflow';

declare function getFieldEntries(context: IWorkflowNodeContext): {
    dataMode: WorkflowInputsData['dataMode'];
    fields: FieldValueOption[];
    subworkflowInfo?: WorkflowInputsData['subworkflowInfo'];
};
declare function getWorkflowInputValues(this: IExecuteFunctions | ISupplyDataFunctions): INodeExecutionData[];
declare function getCurrentWorkflowInputData(this: IExecuteFunctions | ISupplyDataFunctions): INodeExecutionData[];
declare function loadWorkflowInputMappings(this: ILocalLoadOptionsFunctions): Promise<WorkflowInputsData>;

export { getCurrentWorkflowInputData, getFieldEntries, getWorkflowInputValues, loadWorkflowInputMappings };
