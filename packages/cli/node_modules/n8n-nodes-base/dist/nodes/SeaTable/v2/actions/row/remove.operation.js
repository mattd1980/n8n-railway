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
var remove_operation_exports = {};
__export(remove_operation_exports, {
  execute: () => execute
});
module.exports = __toCommonJS(remove_operation_exports);
var import_GenericFunctions = require("../../GenericFunctions");
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const rowId = this.getNodeParameter("rowId", index);
  const requestBody = {
    table_name: tableName,
    row_ids: [rowId]
  };
  const responseData = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "DELETE",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/rows/",
    requestBody
  );
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=remove.operation.js.map