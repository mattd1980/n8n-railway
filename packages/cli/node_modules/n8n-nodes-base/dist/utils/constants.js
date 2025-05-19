"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var constants_exports = {};
__export(constants_exports, {
  ENABLE_LESS_STRICT_TYPE_VALIDATION: () => ENABLE_LESS_STRICT_TYPE_VALIDATION,
  LOCALHOST: () => LOCALHOST,
  NODE_RAN_MULTIPLE_TIMES_WARNING: () => NODE_RAN_MULTIPLE_TIMES_WARNING
});
module.exports = __toCommonJS(constants_exports);
const NODE_RAN_MULTIPLE_TIMES_WARNING = "This node ran multiple times - once for each input item. You can change this by setting 'execute once' in the node settings. <a href='https://docs.n8n.io/flow-logic/looping/#executing-nodes-once' target='_blank'>More Info</a>";
const LOCALHOST = "127.0.0.1";
const ENABLE_LESS_STRICT_TYPE_VALIDATION = "Try changing the type of comparison. Alternatively you can enable 'Convert types where required'.";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ENABLE_LESS_STRICT_TYPE_VALIDATION,
  LOCALHOST,
  NODE_RAN_MULTIPLE_TIMES_WARNING
});
//# sourceMappingURL=constants.js.map