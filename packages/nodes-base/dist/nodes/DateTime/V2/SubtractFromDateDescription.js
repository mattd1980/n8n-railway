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
var SubtractFromDateDescription_exports = {};
__export(SubtractFromDateDescription_exports, {
  SubtractFromDateDescription: () => SubtractFromDateDescription
});
module.exports = __toCommonJS(SubtractFromDateDescription_exports);
var import_common = require("./common.descriptions");
const SubtractFromDateDescription = [
  {
    displayName: "You can also do this using an expression, e.g. <code>{{your_date.minus(5, 'minutes')}}</code>. <a target='_blank' href='https://docs.n8n.io/code/cookbook/luxon/'>More info</a>",
    name: "notice",
    type: "notice",
    default: "",
    displayOptions: {
      show: {
        operation: ["subtractFromDate"]
      }
    }
  },
  {
    displayName: "Date to Subtract From",
    name: "magnitude",
    type: "string",
    description: "The date that you want to change",
    default: "",
    displayOptions: {
      show: {
        operation: ["subtractFromDate"]
      }
    },
    required: true
  },
  {
    displayName: "Time Unit to Subtract",
    name: "timeUnit",
    description: "Time unit for Duration parameter below",
    displayOptions: {
      show: {
        operation: ["subtractFromDate"]
      }
    },
    type: "options",
    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
    options: [
      {
        name: "Years",
        value: "years"
      },
      {
        name: "Quarters",
        value: "quarters"
      },
      {
        name: "Months",
        value: "months"
      },
      {
        name: "Weeks",
        value: "weeks"
      },
      {
        name: "Days",
        value: "days"
      },
      {
        name: "Hours",
        value: "hours"
      },
      {
        name: "Minutes",
        value: "minutes"
      },
      {
        name: "Seconds",
        value: "seconds"
      },
      {
        name: "Milliseconds",
        value: "milliseconds"
      }
    ],
    default: "days",
    required: true
  },
  {
    displayName: "Duration",
    name: "duration",
    type: "number",
    description: "The number of time units to subtract from the date",
    default: 0,
    displayOptions: {
      show: {
        operation: ["subtractFromDate"]
      }
    }
  },
  {
    displayName: "Output Field Name",
    name: "outputFieldName",
    type: "string",
    default: "newDate",
    description: "Name of the field to put the output in",
    displayOptions: {
      show: {
        operation: ["subtractFromDate"]
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
        operation: ["subtractFromDate"]
      }
    },
    default: {},
    options: [import_common.includeInputFields]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SubtractFromDateDescription
});
//# sourceMappingURL=SubtractFromDateDescription.js.map