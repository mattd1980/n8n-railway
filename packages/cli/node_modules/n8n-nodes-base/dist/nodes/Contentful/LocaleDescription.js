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
var LocaleDescription_exports = {};
__export(LocaleDescription_exports, {
  fields: () => fields,
  operations: () => operations,
  resource: () => resource
});
module.exports = __toCommonJS(LocaleDescription_exports);
const resource = {
  name: "Locale",
  value: "locale"
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
        name: "Get Many",
        value: "getAll"
      }
    ],
    default: "getAll"
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
        operation: ["get", "getAll"]
      }
    },
    default: "master",
    description: 'The ID for the Contentful environment (e.g. master, staging, etc.). Depending on your plan, you might not have environments. In that case use "master".'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: [resource.value]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: [resource.value],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fields,
  operations,
  resource
});
//# sourceMappingURL=LocaleDescription.js.map