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
  import_descriptions.taskRLC,
  {
    displayName: "Fields",
    name: "logFields",
    type: "resourceMapper",
    default: {
      mappingMode: "defineBelow",
      value: null
    },
    noDataExpression: true,
    required: true,
    typeOptions: {
      resourceMapper: {
        resourceMapperMethod: "getLogFields",
        mode: "add",
        valuesLabel: "Fields"
      }
    }
  },
  import_descriptions.attachmentsUi
];
const displayOptions = {
  show: {
    resource: ["log"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i, item) {
  let responseData = [];
  let body = {};
  const dataMode = this.getNodeParameter("logFields.mappingMode", i);
  const taskId = this.getNodeParameter("taskId", i, "", { extractValue: true });
  if (dataMode === "autoMapInputData") {
    const schema = this.getNodeParameter("logFields.schema", i);
    body = (0, import_utils.prepareInputItem)(item.json, schema, i);
  }
  if (dataMode === "defineBelow") {
    const logFields = this.getNodeParameter("logFields.value", i, []);
    body = logFields;
  }
  body = (0, import_utils.fixFieldType)(body);
  const inputDataFields = this.getNodeParameter("attachmentsUi.values", i, []).map((entry) => entry.field.trim());
  if (inputDataFields.length) {
    const binaries = [];
    for (const inputDataField of inputDataFields) {
      const binaryData = this.helpers.assertBinaryData(i, inputDataField);
      const dataBuffer = await this.helpers.getBinaryDataBuffer(i, inputDataField);
      binaries.push({
        value: dataBuffer,
        options: {
          contentType: binaryData.mimeType,
          filename: binaryData.fileName
        }
      });
    }
    responseData = await import_transport.theHiveApiRequest.call(
      this,
      "POST",
      `/v1/task/${taskId}/log`,
      void 0,
      void 0,
      void 0,
      {
        Headers: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          attachments: binaries,
          _json: JSON.stringify(body)
        }
      }
    );
  } else {
    responseData = await import_transport.theHiveApiRequest.call(this, "POST", `/v1/task/${taskId}/log`, body);
  }
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