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
  execute: () => execute
});
module.exports = __toCommonJS(get_operation_exports);
var import_utilities = require("../../../../../utils/utilities");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "Record ID",
    name: "id",
    type: "string",
    default: "",
    placeholder: "e.g. recf7EaZp707CEc8g",
    required: true,
    // eslint-disable-next-line n8n-nodes-base/node-param-description-miscased-id
    description: 'ID of the record to get. <a href="https://support.airtable.com/docs/record-id" target="_blank">More info</a>.'
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    description: "Additional options which decide which records should be returned",
    placeholder: "Add option",
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
        displayName: "Download Attachments",
        name: "downloadFields",
        type: "multiOptions",
        typeOptions: {
          loadOptionsMethod: "getAttachmentColumns",
          loadOptionsDependsOn: ["base.value", "table.value"]
        },
        default: [],
        // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-multi-options
        description: "The fields of type 'attachment' that should be downloaded"
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["record"],
    operation: ["get"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(items, base, table) {
  const returnData = [];
  for (let i = 0; i < items.length; i++) {
    let id;
    try {
      id = this.getNodeParameter("id", i);
      const responseData = await import_transport.apiRequest.call(this, "GET", `${base}/${table}/${id}`);
      const options = this.getNodeParameter("options", 0, {});
      if (options.downloadFields) {
        const itemWithAttachments = await import_transport.downloadRecordAttachments.call(
          this,
          [responseData],
          options.downloadFields
        );
        returnData.push(...itemWithAttachments);
        continue;
      }
      const executionData = this.helpers.constructExecutionMetaData(
        (0, import_utilities.wrapData)((0, import_utils.flattenOutput)(responseData)),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    } catch (error) {
      error = (0, import_utils.processAirtableError)(error, id, i);
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message } });
        continue;
      }
      throw error;
    }
  }
  return returnData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute
});
//# sourceMappingURL=get.operation.js.map