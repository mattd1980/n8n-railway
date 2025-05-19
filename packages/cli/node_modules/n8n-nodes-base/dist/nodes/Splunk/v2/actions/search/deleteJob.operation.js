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
var deleteJob_operation_exports = {};
__export(deleteJob_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(deleteJob_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_descriptions = require("../../helpers/descriptions");
var import_transport = require("../../transport");
const properties = [import_descriptions.searchJobRLC];
const displayOptions = {
  show: {
    resource: ["search"],
    operation: ["deleteJob"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const searchJobId = this.getNodeParameter("searchJobId", i, "", { extractValue: true });
  const endpoint = `/services/search/jobs/${searchJobId}`;
  await import_transport.splunkApiRequest.call(this, "DELETE", endpoint);
  return { success: true };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=deleteJob.operation.js.map