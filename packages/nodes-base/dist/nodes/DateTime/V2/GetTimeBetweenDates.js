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
var GetTimeBetweenDates_exports = {};
__export(GetTimeBetweenDates_exports, {
  GetTimeBetweenDatesDescription: () => GetTimeBetweenDatesDescription
});
module.exports = __toCommonJS(GetTimeBetweenDates_exports);
var import_common = require("./common.descriptions");
const GetTimeBetweenDatesDescription = [
  {
    displayName: "Start Date",
    name: "startDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["getTimeBetweenDates"]
      }
    }
  },
  {
    displayName: "End Date",
    name: "endDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["getTimeBetweenDates"]
      }
    }
  },
  {
    displayName: "Units",
    name: "units",
    type: "multiOptions",
    // eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
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
      },
      {
        name: "Millisecond",
        value: "millisecond"
      }
    ],
    displayOptions: {
      show: {
        operation: ["getTimeBetweenDates"]
      }
    },
    default: ["day"]
  },
  {
    displayName: "Output Field Name",
    name: "outputFieldName",
    type: "string",
    default: "timeDifference",
    description: "Name of the field to put the output in",
    displayOptions: {
      show: {
        operation: ["getTimeBetweenDates"]
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
        operation: ["getTimeBetweenDates"]
      }
    },
    default: {},
    options: [
      import_common.includeInputFields,
      {
        displayName: "Output as ISO String",
        name: "isoString",
        type: "boolean",
        default: false,
        description: "Whether to output the date as ISO string or not"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetTimeBetweenDatesDescription
});
//# sourceMappingURL=GetTimeBetweenDates.js.map