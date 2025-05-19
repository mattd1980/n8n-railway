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
var descriptions_exports = {};
__export(descriptions_exports, {
  limitWaitTimeProperties: () => limitWaitTimeProperties,
  sendAndWaitWebhooksDescription: () => sendAndWaitWebhooksDescription
});
module.exports = __toCommonJS(descriptions_exports);
const sendAndWaitWebhooksDescription = [
  {
    name: "default",
    httpMethod: "GET",
    responseMode: "onReceived",
    responseData: "",
    path: "={{ $nodeId }}",
    restartWebhook: true,
    isFullPath: true
  },
  {
    name: "default",
    httpMethod: "POST",
    responseMode: "onReceived",
    responseData: "",
    path: "={{ $nodeId }}",
    restartWebhook: true,
    isFullPath: true
  }
];
const limitWaitTimeProperties = [
  {
    displayName: "Limit Type",
    name: "limitType",
    type: "options",
    default: "afterTimeInterval",
    description: "Sets the condition for the execution to resume. Can be a specified date or after some time.",
    options: [
      {
        name: "After Time Interval",
        description: "Waits for a certain amount of time",
        value: "afterTimeInterval"
      },
      {
        name: "At Specified Time",
        description: "Waits until the set date and time to continue",
        value: "atSpecifiedTime"
      }
    ]
  },
  {
    displayName: "Amount",
    name: "resumeAmount",
    type: "number",
    displayOptions: {
      show: {
        limitType: ["afterTimeInterval"]
      }
    },
    typeOptions: {
      minValue: 0,
      numberPrecision: 2
    },
    default: 1,
    description: "The time to wait"
  },
  {
    displayName: "Unit",
    name: "resumeUnit",
    type: "options",
    displayOptions: {
      show: {
        limitType: ["afterTimeInterval"]
      }
    },
    options: [
      {
        name: "Minutes",
        value: "minutes"
      },
      {
        name: "Hours",
        value: "hours"
      },
      {
        name: "Days",
        value: "days"
      }
    ],
    default: "hours",
    description: "Unit of the interval value"
  },
  {
    displayName: "Max Date and Time",
    name: "maxDateAndTime",
    type: "dateTime",
    displayOptions: {
      show: {
        limitType: ["atSpecifiedTime"]
      }
    },
    default: "",
    description: "Continue execution after the specified date and time"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  limitWaitTimeProperties,
  sendAndWaitWebhooksDescription
});
//# sourceMappingURL=descriptions.js.map