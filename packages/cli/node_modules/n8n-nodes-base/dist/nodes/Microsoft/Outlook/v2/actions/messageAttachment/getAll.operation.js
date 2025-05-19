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
var getAll_operation_exports = {};
__export(getAll_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.messageRLC,
  ...import_descriptions.returnAllOrLimit,
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "multiOptions",
        description: "The fields to add to the output",
        default: [],
        options: [
          {
            name: "contentType",
            value: "contentType"
          },
          {
            name: "isInline",
            value: "isInline"
          },
          {
            name: "lastModifiedDateTime",
            value: "lastModifiedDateTime"
          },
          {
            // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
            name: "name",
            value: "name"
          },
          {
            // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
            name: "size",
            value: "size"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["messageAttachment"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let responseData;
  const qs = {};
  const messageId = this.getNodeParameter("messageId", index, void 0, {
    extractValue: true
  });
  const returnAll = this.getNodeParameter("returnAll", index);
  const options = this.getNodeParameter("options", index);
  qs.$select = "id,lastModifiedDateTime,name,contentType,size,isInline";
  if (options.fields && options.fields.length) {
    qs.$select = options.fields.map((field) => field.trim()).join(",");
  }
  const endpoint = `/messages/${messageId}/attachments`;
  if (returnAll) {
    responseData = await import_transport.microsoftApiRequestAllItems.call(
      this,
      "value",
      "GET",
      endpoint,
      void 0,
      qs
    );
  } else {
    qs.$top = this.getNodeParameter("limit", index);
    responseData = await import_transport.microsoftApiRequest.call(this, "GET", endpoint, void 0, qs);
    responseData = responseData.value;
  }
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
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
//# sourceMappingURL=getAll.operation.js.map