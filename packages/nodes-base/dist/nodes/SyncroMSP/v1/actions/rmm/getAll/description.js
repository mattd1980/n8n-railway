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
var description_exports = {};
__export(description_exports, {
  rmmGetAllDescription: () => rmmGetAllDescription
});
module.exports = __toCommonJS(description_exports);
const rmmGetAllDescription = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["getAll"]
      }
    },
    default: false,
    noDataExpression: true,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    default: 25,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Active",
            value: "active"
          },
          {
            name: "All",
            value: "all"
          },
          {
            name: "Resolved",
            value: "resolved"
          }
        ],
        default: "all"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rmmGetAllDescription
});
//# sourceMappingURL=description.js.map