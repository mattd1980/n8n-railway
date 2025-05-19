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
var utils_exports = {};
__export(utils_exports, {
  prepareFieldsArray: () => prepareFieldsArray
});
module.exports = __toCommonJS(utils_exports);
var import_n8n_workflow = require("n8n-workflow");
const prepareFieldsArray = (fields, fieldName = "Fields") => {
  if (typeof fields === "string") {
    return fields.split(",").map((entry) => entry.trim()).filter((entry) => entry !== "");
  }
  if (Array.isArray(fields)) {
    return fields;
  }
  throw new import_n8n_workflow.ApplicationError(
    `The '${fieldName}' parameter must be a string of fields separated by commas or an array of strings.`,
    { level: "warning" }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prepareFieldsArray
});
//# sourceMappingURL=utils.js.map