import { z } from 'zod';
export type CollaborationMessage = WorkflowOpenedMessage | WorkflowClosedMessage;
export declare const workflowOpenedMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"workflowOpened">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    type: "workflowOpened";
    workflowId: string;
}, {
    type: "workflowOpened";
    workflowId: string;
}>;
export declare const workflowClosedMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"workflowClosed">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    type: "workflowClosed";
    workflowId: string;
}, {
    type: "workflowClosed";
    workflowId: string;
}>;
export declare const workflowMessageSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"workflowOpened">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    type: "workflowOpened";
    workflowId: string;
}, {
    type: "workflowOpened";
    workflowId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"workflowClosed">;
    workflowId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    type: "workflowClosed";
    workflowId: string;
}, {
    type: "workflowClosed";
    workflowId: string;
}>]>;
export type WorkflowOpenedMessage = z.infer<typeof workflowOpenedMessageSchema>;
export type WorkflowClosedMessage = z.infer<typeof workflowClosedMessageSchema>;
export type WorkflowMessage = z.infer<typeof workflowMessageSchema>;
export declare const parseWorkflowMessage: (msg: unknown) => Promise<{
    type: "workflowOpened";
    workflowId: string;
} | {
    type: "workflowClosed";
    workflowId: string;
}>;
