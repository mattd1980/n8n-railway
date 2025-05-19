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
const properties = [import_descriptions.logRLC, import_descriptions.attachmentsUi];
const displayOptions = {
  show: {
    resource: ["log"],
    operation: ["addAttachment"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const logId = this.getNodeParameter("logId", i, "", { extractValue: true });
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
  await import_transport.theHiveApiRequest.call(
    this,
    "POST",
    `/v1/log/${logId}/attachments`,
    void 0,
    void 0,
    void 0,
    {
      Headers: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        attachments
      }
    }
  );
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
//# sourceMappingURL=addAttachment.operation.js.map