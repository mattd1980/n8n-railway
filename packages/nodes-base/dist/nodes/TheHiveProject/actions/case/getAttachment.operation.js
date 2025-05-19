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
var getAttachment_operation_exports = {};
__export(getAttachment_operation_exports, {
  description: () => description,
  execute: () => execute
});
module.exports = __toCommonJS(getAttachment_operation_exports);
var import_utilities = require("../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.caseRLC,
  {
    displayName: "Attachment Name or ID",
    name: "attachmentId",
    type: "options",
    default: "",
    required: true,
    description: 'ID of the attachment. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    typeOptions: {
      loadOptionsMethod: "loadCaseAttachments",
      loadOptionsDependsOn: ["caseId.value"]
    }
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
        type: "string",
        default: "",
        description: "Rename the file when downloading"
      },
      {
        displayName: "Data Property Name",
        name: "dataPropertyName",
        type: "string",
        default: "data",
        description: "Name of the binary property to which write the data of the attachment"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["case"],
    operation: ["getAttachment"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(i) {
  const caseId = this.getNodeParameter("caseId", i, "", { extractValue: true });
  const options = this.getNodeParameter("options", i);
  const attachmentId = this.getNodeParameter("attachmentId", i);
  const requestOptions = {
    useStream: true,
    resolveWithFullResponse: true,
    encoding: null,
    json: false
  };
  const response = await import_transport.theHiveApiRequest.call(
    this,
    "GET",
    `/v1/case/${caseId}/attachment/${attachmentId}/download`,
    void 0,
    void 0,
    void 0,
    requestOptions
  );
  const mimeType = response.headers?.["content-type"] ?? void 0;
  let fileName = options.fileName || "attachment";
  if (!options.fileName && response.headers["content-disposition"] !== void 0) {
    const contentDisposition = response.headers["content-disposition"];
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    if (fileNameMatch !== null) {
      fileName = fileNameMatch[1];
    }
  }
  const newItem = {
    json: {
      _id: attachmentId,
      caseId,
      fileName,
      mimeType
    },
    binary: {}
  };
  newItem.binary[options.dataPropertyName || "data"] = await this.helpers.prepareBinaryData(response.body, fileName, mimeType);
  const executionData = this.helpers.constructExecutionMetaData([newItem], {
    itemData: { item: i }
  });
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=getAttachment.operation.js.map