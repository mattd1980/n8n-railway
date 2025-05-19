"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderIdSchema = exports.folderNameSchema = void 0;
const zod_1 = require("zod");
exports.folderNameSchema = zod_1.z.string().trim().min(1).max(128);
exports.folderIdSchema = zod_1.z.string().max(36);
//# sourceMappingURL=folder.schema.js.map