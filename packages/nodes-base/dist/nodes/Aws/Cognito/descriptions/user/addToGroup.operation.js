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
var addToGroup_operation_exports = {};
__export(addToGroup_operation_exports, {
  description: () => description
});
module.exports = __toCommonJS(addToGroup_operation_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_common = require("../common.description");
const properties = [
  {
    ...import_common.userPoolResourceLocator,
    description: "Select the user pool to use"
  },
  {
    ...import_common.userResourceLocator,
    description: "Select the user you want to add to the group"
  },
  {
    ...import_common.groupResourceLocator,
    description: "Select the group you want to add the user to"
  }
];
const displayOptions = {
  show: {
    resource: ["user"],
    operation: ["addToGroup"]
  }
};
const description = (0, import_n8n_workflow.updateDisplayOptions)(displayOptions, properties);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description
});
//# sourceMappingURL=addToGroup.operation.js.map