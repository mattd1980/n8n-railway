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
var ContentTypeDescription_exports = {};
__export(ContentTypeDescription_exports, {
  fields: () => fields,
  operations: () => operations,
  resource: () => resource
});
module.exports = __toCommonJS(ContentTypeDescription_exports);
const resource = {
  name: "Content Type",
  value: "contentType"
};
const operations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [resource.value]
      }
    },
    options: [
      {
        name: "Get",
        value: "get"
      }
    ],
    default: "get"
  }
];
const fields = [
  {
    displayName: "Environment ID",
    name: "environmentId",
    type: "string",
    displayOptions: {
      show: {
        resource: [resource.value],
        operation: ["get"]
      }
    },
    default: "master",
    description: 'The ID for the Contentful environment (e.g. master, staging, etc.). Depending on your plan, you might not have environments. In that case use "master".'
  },
  {
    displayName: "Content Type ID",
    name: "contentTypeId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: [resource.value],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: [resource.value],
        operation: ["get"]
      }
    },
    options: [
      {
        displayName: "RAW Data",
        name: "rawData",
        type: "boolean",
        default: false,
        description: "Whether the data should be returned RAW instead of parsed"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fields,
  operations,
  resource
});
//# sourceMappingURL=ContentTypeDescription.js.map