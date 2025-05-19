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
var ExtractDateDescription_exports = {};
__export(ExtractDateDescription_exports, {
  ExtractDateDescription: () => ExtractDateDescription
});
module.exports = __toCommonJS(ExtractDateDescription_exports);
var import_common = require("./common.descriptions");
const ExtractDateDescription = [
  {
    displayName: 'You can also do this using an expression, e.g. <code>{{ your_date.extract("month") }}}</code>. <a target="_blank" href="https://docs.n8n.io/code/cookbook/luxon/">More info</a>',
    name: "notice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        operation: ["extractDate"]
      }
    }
  },
  {
    displayName: "Date",
    name: "date",
    type: "string",
    description: "The date that you want to round",
    default: "",
    displayOptions: {
      show: {
        operation: ["extractDate"]
      }
    }
  },
  {
    displayName: "Part",
    name: "part",
    type: "options",
    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
    options: [
      {
        name: "Year",
        value: "year"
      },
      {
        name: "Month",
        value: "month"
      },
      {
        name: "Week",
        value: "week"
      },
      {
        name: "Day",
        value: "day"
      },
      {
        name: "Hour",
        value: "hour"
      },
      {
        name: "Minute",
        value: "minute"
      },
      {
        name: "Second",
        value: "second"
      }
    ],
    default: "month",
    displayOptions: {
      show: {
        operation: ["extractDate"]
      }
    }
  },
  {
    displayName: "Output Field Name",
    name: "outputFieldName",
    type: "string",
    default: "datePart",
    description: "Name of the field to put the output in",
    displayOptions: {
      show: {
        operation: ["extractDate"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    displayOptions: {
      show: {
        operation: ["extractDate"]
      }
    },
    default: {},
    options: [import_common.includeInputFields]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExtractDateDescription
});
//# sourceMappingURL=ExtractDateDescription.js.map