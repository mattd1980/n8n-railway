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
var deleteComment_operation_exports = {};
__export(deleteComment_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(deleteComment_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [import_descriptions.commentRLC];
const displayOptions = {
  show: {
    resource: ["comment"],
    operation: ["deleteComment"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const commentId = this.getNodeParameter("commentId", i, "", { extractValue: true });
  await import_transport.theHiveApiRequest.call(this, "DELETE", `/v1/comment/${commentId}`);
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)({ success: true }), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=deleteComment.operation.js.map