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
var promote_operation_exports = {};
__export(promote_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(promote_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.alertRLC,
  {
    displayName: "Options",
    name: "options",
    placeholder: "Add Field",
    type: "collection",
    default: {},
    options: [
      {
        displayName: "Case Template Name or ID",
        name: "caseTemplate",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        typeOptions: {
          loadOptionsMethod: "loadCaseTemplate"
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["alert"],
    operation: ["promote"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = [];
  const alertId = this.getNodeParameter("alertId", i, "", { extractValue: true });
  const caseTemplate = this.getNodeParameter("options.caseTemplate", i, "");
  const body = {};
  if (caseTemplate) {
    body.caseTemplate = caseTemplate;
  }
  responseData = await import_transport.theHiveApiRequest.call(this, "POST", `/v1/alert/${alertId}/case`, body);
  const executionData = this.helpers.constructExecutionMetaData((0, import_utilities.wrapData)(responseData), {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=promote.operation.js.map