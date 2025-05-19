"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWorkflowMessage = exports.workflowMessageSchema = exports.workflowClosedMessageSchema = exports.workflowOpenedMessageSchema = void 0;
const zod_1 = require("zod");
exports.workflowOpenedMessageSchema = zod_1.z
    .object({
    type: zod_1.z.literal('workflowOpened'),
    workflowId: zod_1.z.string().min(1),
})
    .strict();
exports.workflowClosedMessageSchema = zod_1.z
    .object({
    type: zod_1.z.literal('workflowClosed'),
    workflowId: zod_1.z.string().min(1),
})
    .strict();
exports.workflowMessageSchema = zod_1.z.discriminatedUnion('type', [
    exports.workflowOpenedMessageSchema,
    exports.workflowClosedMessageSchema,
]);
const parseWorkflowMessage = async (msg) => {
    return await exports.workflowMessageSchema.parseAsync(msg);
};
exports.parseWorkflowMessage = parseWorkflowMessage;
//# sourceMappingURL=collaboration.message.js.map