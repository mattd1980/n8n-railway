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
var add_operation_exports = {};
__export(add_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(add_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.messageRLC,
  {
    displayName: "Input Data Field Name",
    name: "binaryPropertyName",
    hint: "The name of the input field containing the binary file data to be attached",
    type: "string",
    required: true,
    default: "data",
    placeholder: "e.g. data"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "File Name",
        name: "fileName",
        description: "Filename of the attachment. If not set will the file-name of the binary property be used, if it exists.",
        type: "string",
        default: ""
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["messageAttachment"],
    operation: ["add"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index, items) {
  let responseData;
  const messageId = this.getNodeParameter("messageId", index, void 0, {
    extractValue: true
  });
  const binaryPropertyName = this.getNodeParameter("binaryPropertyName", 0);
  const options = this.getNodeParameter("options", index);
  if (items[index].binary === void 0) {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "No binary data exists on item!");
  }
  if (items[index].binary && items[index].binary[binaryPropertyName] === void 0) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      `No binary data property "${binaryPropertyName}" does not exists on item!`,
      { itemIndex: index }
    );
  }
  const binaryData = items[index].binary[binaryPropertyName];
  const dataBuffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);
  const fileName = options.fileName === void 0 ? binaryData.fileName : options.fileName;
  if (!fileName) {
    throw new import_n8n_workflow.NodeOperationError(
      this.getNode(),
      'File name is not set. It has either to be set via "Additional Fields" or has to be set on the binary property!',
      { itemIndex: index }
    );
  }
  if (dataBuffer.length > 3e6) {
    const chunkSize = 4e6;
    const body = {
      AttachmentItem: {
        attachmentType: "file",
        name: fileName,
        size: dataBuffer.length
      }
    };
    responseData = await import_transport.microsoftApiRequest.call(
      this,
      "POST",
      `/messages/${messageId}/attachments/createUploadSession`,
      body
    );
    const uploadUrl = responseData.uploadUrl;
    if (uploadUrl === void 0) {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), responseData, {
        message: "Failed to get upload session"
      });
    }
    for (let bytesUploaded = 0; bytesUploaded < dataBuffer.length; bytesUploaded += chunkSize) {
      const nextChunk = Math.min(bytesUploaded + chunkSize, dataBuffer.length);
      const contentRange = `bytes ${bytesUploaded}-${nextChunk - 1}/${dataBuffer.length}`;
      const data = dataBuffer.subarray(bytesUploaded, nextChunk);
      responseData = await this.helpers.request(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": data.length,
          "Content-Range": contentRange
        },
        body: data
      });
    }
  } else {
    const body = {
      "@odata.type": "#microsoft.graph.fileAttachment",
      name: fileName,
      contentBytes: binaryData.data
    };
    responseData = await import_transport.microsoftApiRequest.call(
      this,
      "POST",
      `/messages/${messageId}/attachments`,
      body,
      {}
    );
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray({ success: true }),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=add.operation.js.map