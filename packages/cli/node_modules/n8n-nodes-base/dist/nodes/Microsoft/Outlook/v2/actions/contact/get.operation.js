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
  import_descriptions.contactRLC,
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
    options: import_utils.contactFields,
    default: []
  }
];
const displayOptions = {
  show: {
    resource: ["contact"],
    operation: ["get"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const qs = {};
  const contactId = this.getNodeParameter("contactId", index, void 0, {
    extractValue: true
  });
  const output = this.getNodeParameter("output", index);
  if (output === "fields") {
    const fields = this.getNodeParameter("fields", index);
    qs.$select = fields.join(",");
  }
  if (output === "simple") {
    qs.$select = "id,displayName,emailAddresses,businessPhones,mobilePhone";
  }
  const responseData = await import_transport.microsoftApiRequest.call(
    this,
    "GET",
    `/contacts/${contactId}`,
    void 0,
    qs
  );
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
//# sourceMappingURL=get.operation.js.map