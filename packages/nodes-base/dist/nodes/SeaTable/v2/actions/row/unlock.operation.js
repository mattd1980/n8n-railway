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
var unlock_operation_exports = {};
__export(unlock_operation_exports, {
  execute: () => execute
});
module.exports = __toCommonJS(unlock_operation_exports);
var import_GenericFunctions = require("../../GenericFunctions");
async function execute(index) {
  const tableName = this.getNodeParameter("tableName", index);
  const rowId = this.getNodeParameter("rowId", index);
  const responseData = await import_GenericFunctions.seaTableApiRequest.call(
    this,
    {},
    "PUT",
    "/api-gateway/api/v2/dtables/{{dtable_uuid}}/unlock-rows/",
    {
      table_name: tableName,
      row_ids: [rowId]
    }
  );
  return this.helpers.returnJsonArray(responseData);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=unlock.operation.js.map