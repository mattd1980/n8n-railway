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
var download_operation_exports = {};
__export(download_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(download_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.messageRLC,
  import_descriptions.attachmentRLC,
  {
    displayName: "Put Output in Field",
    name: "binaryPropertyName",
    hint: "The name of the output field to put the binary file data in",
    type: "string",
    required: true,
    default: "data"
  }
];
const displayOptions = {
  show: {
    resource: ["messageAttachment"],
    operation: ["download"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index, items) {
  const messageId = this.getNodeParameter("messageId", index, void 0, {
    extractValue: true
  });
  const attachmentId = this.getNodeParameter("attachmentId", index, void 0, {
    extractValue: true
  });
  const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", index);
  const attachmentDetails = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/messages/${messageId}/attachments/${attachmentId}`,
    void 0,
    { $select: "id,name,contentType" }
  );
  let mimeType;
  if (attachmentDetails.contentType) {
    mimeType = attachmentDetails.contentType;
  }
  const fileName = attachmentDetails.name;
  const response = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/messages/${messageId}/attachments/${attachmentId}/$value`,
    void 0,
    {},
    void 0,
    {},
    { encoding: null, resolveWithFullResponse: true }
  );
  const newItem = {
    json: items[index].json,
    binary: {}
  };
  if (items[index].binary !== void 0) {
    Object.assign(newItem.binary, items[index].binary);
  }
  const data = Buffer.from(response.body, "utf8");
  newItem.binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
    data,
    fileName,
    mimeType
  );
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(newItem),
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
//# sourceMappingURL=download.operation.js.map