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
var status_operation_exports = {};
__export(status_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(status_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.alertRLC,
  {
    displayName: "Status Name or ID",
    name: "status",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    required: true,
    typeOptions: {
      loadOptionsMethod: "loadAlertStatus"
    }
  }
];
const displayOptions = {
  show: {
    resource: ["alert"],
    operation: ["status"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const alertId = this.getNodeParameter("alertId", i, "", { extractValue: true });
  const status = this.getNodeParameter("status", i);
  await import_transport.theHiveApiRequest.call(this, "PATCH", `/v1/alert/${alertId}`, { status });
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
//# sourceMappingURL=status.operation.js.map