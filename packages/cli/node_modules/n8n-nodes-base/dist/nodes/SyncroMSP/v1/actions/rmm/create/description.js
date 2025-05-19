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
  rmmCreateDescription: () => rmmCreateDescription
});
module.exports = __toCommonJS(description_exports);
const rmmCreateDescription = [
  {
    displayName: "Asset ID",
    name: "assetId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["create"]
      }
    },
    default: ""
  },
  {
    displayName: "Customer ID",
    name: "customerId",
    type: "string",
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["create"]
      }
    },
    default: ""
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["create"]
      }
    },
    default: ""
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["rmm"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Resolved",
        name: "resolved",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rmmCreateDescription
});
//# sourceMappingURL=description.js.map