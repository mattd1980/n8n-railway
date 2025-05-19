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
var SiteDescription_exports = {};
__export(SiteDescription_exports, {
  siteFields: () => siteFields,
  siteOperations: () => siteOperations
});
module.exports = __toCommonJS(SiteDescription_exports);
const siteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["site"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        description: "Delete a site",
        action: "Delete a site"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a site",
        action: "Get a site"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Returns many sites",
        action: "Get many sites"
      }
    ],
    default: "delete"
  }
];
const siteFields = [
  {
    displayName: "Site ID",
    name: "siteId",
    required: true,
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["site"],
        operation: ["get", "delete"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["site"]
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
        resource: ["site"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 200
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  siteFields,
  siteOperations
});
//# sourceMappingURL=SiteDescription.js.map