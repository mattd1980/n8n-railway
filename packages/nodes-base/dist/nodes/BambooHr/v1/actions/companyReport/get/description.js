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
  companyReportGetDescription: () => companyReportGetDescription
});
module.exports = __toCommonJS(description_exports);
const companyReportGetDescription = [
  {
    displayName: "Report ID",
    name: "reportId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["companyReport"]
      }
    },
    default: "",
    description: "ID of the report. You can get the report number by hovering over the report name on the reports page and grabbing the ID."
  },
  {
    displayName: "Format",
    name: "format",
    type: "options",
    options: [
      {
        name: "CSV",
        value: "CSV"
      },
      {
        name: "JSON",
        value: "JSON"
      },
      {
        name: "PDF",
        value: "PDF"
      },
      {
        name: "XLS",
        value: "XLS"
      },
      {
        name: "XML",
        value: "XML"
      }
    ],
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["companyReport"]
      }
    },
    default: "JSON",
    description: "The output format for the report"
  },
  {
    displayName: "Put Output In Field",
    name: "output",
    type: "string",
    default: "data",
    required: true,
    description: "The name of the output field to put the binary file data in",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["companyReport"]
      },
      hide: {
        format: ["JSON"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["companyReport"]
      }
    },
    options: [
      {
        displayName: "Duplicate Field Filtering",
        name: "fd",
        type: "boolean",
        default: true,
        description: "Whether to apply the standard duplicate field filtering or not"
      },
      {
        displayName: "Only Current",
        name: "onlyCurrent",
        type: "boolean",
        default: true,
        description: "Whether to hide future dated values from the history table fields or not"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  companyReportGetDescription
});
//# sourceMappingURL=description.js.map