import { z } from 'zod';
export declare const heartbeatMessageSchema: z.ZodObject<{
    type: z.ZodLiteral<"heartbeat">;
}, "strip", z.ZodTypeAny, {
    type: "heartbeat";
}, {
    type: "heartbeat";
}>;
export type HeartbeatMessage = z.infer<typeof heartbeatMessageSchema>;
export declare const createHeartbeatMessage: () => HeartbeatMessage;
