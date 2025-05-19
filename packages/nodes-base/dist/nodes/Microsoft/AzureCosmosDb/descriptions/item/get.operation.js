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
  description: () => description
});
module.exports = __toCommonJS(get_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common");
const properties = [
  { ...import_common.containerResourceLocator, description: "Select the container you want to use" },
  { ...import_common.itemResourceLocator, description: "Select the item you want to retrieve" },
  {
    displayName: "Simplify",
    name: "simple",
    default: true,
    description: "Whether to return a simplified version of the response instead of the raw data",
    displayOptions: {
      hide: {
        ...import_utils.untilContainerSelected,
        ...import_utils.untilItemSelected
      }
    },
    type: "boolean"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    default: {},
    displayOptions: {
      hide: {
        ...import_utils.untilContainerSelected,
        ...import_utils.untilItemSelected
      }
    },
    options: [
      {
        displayName: "Partition Key",
        name: "partitionKey",
        default: "",
        hint: "Only required if a custom partition key is set for the container",
        type: "string"
      }
    ],
    placeholder: "Add Partition Key",
    type: "collection"
  }
];
const displayOptions = {
  show: {
    resource: ["item"],
    operation: ["get"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=get.operation.js.map