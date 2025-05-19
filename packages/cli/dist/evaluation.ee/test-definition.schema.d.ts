import { z } from 'zod';
export declare const testDefinitionCreateRequestBodySchema: z.ZodObject<{
    name: z.ZodString;
    workflowId: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    evaluationWorkflowId: z.ZodOptional<z.ZodString>;
    annotationTagId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    workflowId: string;
    name: string;
    description?: string | undefined;
    evaluationWorkflowId?: string | undefined;
    annotationTagId?: string | undefined;
}, {
    workflowId: string;
    name: string;
    description?: string | undefined;
    evaluationWorkflowId?: string | undefined;
    annotationTagId?: string | undefined;
}>;
export declare const testDefinitionPatchRequestBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    evaluationWorkflowId: z.ZodOptional<z.ZodString>;
    annotationTagId: z.ZodOptional<z.ZodString>;
    mockedNodes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    description?: string | undefined;
    name?: string | undefined;
    evaluationWorkflowId?: string | undefined;
    annotationTagId?: string | undefined;
    mockedNodes?: {
        id: string;
        name: string;
    }[] | undefined;
}, {
    description?: string | undefined;
    name?: string | undefined;
    evaluationWorkflowId?: string | undefined;
    annotationTagId?: string | undefined;
    mockedNodes?: {
        id: string;
        name: string;
    }[] | undefined;
}>;
