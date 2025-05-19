"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeartbeatMessage = exports.heartbeatMessageSchema = void 0;
const zod_1 = require("zod");
exports.heartbeatMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('heartbeat'),
});
const createHeartbeatMessage = () => ({
    type: 'heartbeat',
});
exports.createHeartbeatMessage = createHeartbeatMessage;
//# sourceMappingURL=heartbeat.js.map