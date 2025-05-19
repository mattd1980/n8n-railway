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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(update_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_utils = require("../../helpers/utils");
var import_common = require("../common");
const properties = [
  {
    ...import_common.groupLocator,
    description: "Select the group you want to update"
  },
  {
    ...import_common.groupNameParameter,
    description: "The new name of the group",
    placeholder: "e.g. GroupName"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        ...import_common.pathParameter,
        placeholder: "e.g. /division_abc/engineering/",
        description: "The new path to the group, if it is not included, it defaults to a slash (/)",
        routing: {
          send: {
            preSend: [import_utils.validatePath],
            property: "NewPath",
            type: "query"
          }
        }
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["group"],
    operation: ["update"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=update.operation.js.map