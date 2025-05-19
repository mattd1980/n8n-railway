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
var addAttachment_operation_exports = {};
__export(addAttachment_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(addAttachment_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.caseRLC,
  import_descriptions.attachmentsUi,
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Rename Files",
        name: "canRename",
        type: "boolean",
        description: "Whether to rename the file in case a file with the same name already exists",
        default: false
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["case"],
    operation: ["addAttachment"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  let responseData = [];
  const caseId = this.getNodeParameter("caseId", i, "", { extractValue: true });
  const canRename = this.getNodeParameter("options.canRename", i, false);
  const inputDataFields = this.getNodeParameter("attachmentsUi.values", i, []).map((entry) => entry.field.trim());
  const attachments = [];
  for (const inputDataField of inputDataFields) {
    const binaryData = this.helpers.assertBinaryData(i, inputDataField);
    const dataBuffer = await this.helpers.getBinaryDataBuffer(i, inputDataField);
    attachments.push({
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
    `/v1/case/${caseId}/attachments`,
    void 0,
    void 0,
    void 0,
    {
      Headers: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        attachments,
        canRename: JSON.stringify(canRename)
      }
    }
  );
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
//# sourceMappingURL=addAttachment.operation.js.map