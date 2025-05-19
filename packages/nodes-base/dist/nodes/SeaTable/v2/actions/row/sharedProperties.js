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
var sharedProperties_exports = {};
__export(sharedProperties_exports, {
  sharedProperties: () => sharedProperties
});
module.exports = __toCommonJS(sharedProperties_exports);
const sharedProperties = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Table Name",
    name: "tableName",
    type: "options",
    placeholder: "Select a table",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getTableNames"
    },
    default: "",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    displayOptions: {
      show: {
        resource: ["row"]
      }
    }
  },
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: "Row ID",
    name: "rowId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    typeOptions: {
      loadOptionsDependsOn: ["tableName"],
      loadOptionsMethod: "getRowIds"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["row"]
      },
      hide: {
        operation: ["create", "list", "search"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sharedProperties
});
//# sourceMappingURL=sharedProperties.js.map