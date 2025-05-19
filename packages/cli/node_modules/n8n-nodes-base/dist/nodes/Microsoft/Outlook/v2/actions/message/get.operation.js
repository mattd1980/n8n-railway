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
var get_operation_exports = {};
__export(get_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(get_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.messageRLC,
  {
    displayName: "Output",
    name: "output",
    type: "options",
    default: "simple",
    options: [
      {
        name: "Simplified",
        value: "simple"
      },
      {
        name: "Raw",
        value: "raw"
      },
      {
        name: "Select Included Fields",
        value: "fields"
      }
    ]
  },
  {
    displayName: "Fields",
    name: "fields",
    type: "multiOptions",
    description: "The fields to add to the output",
    displayOptions: {
      show: {
        output: ["fields"]
      }
    },
    options: import_utils.messageFields,
    default: []
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Attachments Prefix",
        name: "attachmentsPrefix",
        type: "string",
        default: "attachment_",
        description: 'Prefix for name of the output fields to put the binary files data in. An index starting from 0 will be added. So if name is "attachment_" the first attachment is saved to "attachment_0".'
      },
      {
        displayName: "Download Attachments",
        name: "downloadAttachments",
        type: "boolean",
        default: false,
        description: "Whether the message's attachments will be downloaded and included in the output"
      },
      {
        displayName: "Get MIME Content",
        name: "getMimeContent",
        type: "fixedCollection",
        default: { values: { binaryPropertyName: "data" } },
        options: [
          {
            displayName: "Values",
            name: "values",
            values: [
              {
                displayName: "Put Output in Field",
                name: "binaryPropertyName",
                type: "string",
                default: "",
                hint: "The name of the output field to put the binary file data in"
              },
              {
                displayName: "File Name",
                name: "outputFileName",
                type: "string",
                placeholder: "message",
                default: "",
                description: "Optional name of the output file, if not set message ID is used"
              }
            ]
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["message"],
    operation: ["get"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let responseData;
  const qs = {};
  const messageId = this.getNodeParameter("messageId", index, void 0, {
    extractValue: true
  });
  const options = this.getNodeParameter("options", index, {});
  const output = this.getNodeParameter("output", index);
  if (output === "fields") {
    const fields = this.getNodeParameter("fields", index);
    if (options.downloadAttachments) {
      fields.push("hasAttachments");
    }
    qs.$select = fields.join(",");
  }
  if (output === "simple") {
    qs.$select = "id,conversationId,subject,bodyPreview,from,toRecipients,categories,hasAttachments";
  }
  responseData = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/messages/${messageId}`,
    void 0,
    qs
  );
  if (output === "simple") {
    responseData = (0, import_utils.simplifyOutputMessages)([responseData]);
  }
  let executionData = [];
  if (options.downloadAttachments) {
    const prefix = options.attachmentsPrefix || "attachment_";
    executionData = await import_transport.downloadAttachments.call(this, responseData, prefix);
  } else {
    executionData = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray(responseData),
      { itemData: { item: index } }
    );
  }
  if (options.getMimeContent) {
    const { binaryPropertyName, outputFileName } = options.getMimeContent.values;
    const binary = await import_transport.getMimeContent.call(
      this,
      messageId,
      binaryPropertyName,
      outputFileName
    );
    executionData[0].binary = {
      ...executionData[0].binary || {},
      ...binary
    };
  }
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=get.operation.js.map