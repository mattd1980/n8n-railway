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
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(create_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.caseRLC,
  {
    displayName: "Fields",
    name: "taskFields",
    type: "resourceMapper",
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    noDataExpression: true,
    required: true,
    typeOptions: {
      resourceMapper: {
        resourceMapperMethod: "getTaskFields",
        mode: "add",
        valuesLabel: "Fields"
      }
    }
  }
];
const displayOptions = {
  show: {
    resource: ["task"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i, item) {
  let responseData = [];
  let body = {};
  const dataMode = this.getNodeParameter("taskFields.mappingMode", i);
  const caseId = this.getNodeParameter("caseId", i, "", { extractValue: true });
  if (dataMode === "autoMapInputData") {
    const schema = this.getNodeParameter("taskFields.schema", i);
    body = (0, import_utils.prepareInputItem)(item.json, schema, i);
  }
  if (dataMode === "defineBelow") {
    const taskFields = this.getNodeParameter("taskFields.value", i, []);
    body = taskFields;
  }
  body = (0, import_utils.fixFieldType)(body);
  responseData = await import_transport.theHiveApiRequest.call(this, "POST", `/v1/case/${caseId}/task`, body);
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
//# sourceMappingURL=create.operation.js.map