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
var ExchangeRateDescription_exports = {};
__export(ExchangeRateDescription_exports, {
  exchangeRateFields: () => exchangeRateFields,
  exchangeRateOperations: () => exchangeRateOperations
});
module.exports = __toCommonJS(ExchangeRateDescription_exports);
const exchangeRateOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get an exchange rate"
      }
    ],
    displayOptions: {
      show: {
        resource: ["exchangeRate"]
      }
    }
  }
];
const exchangeRateFields = [
  // ----------------------------------
  //         exchangeRate: get
  // ----------------------------------
  {
    displayName: "Source Currency",
    name: "source",
    type: "string",
    default: "",
    description: "Code of the source currency to retrieve the exchange rate for",
    displayOptions: {
      show: {
        resource: ["exchangeRate"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Target Currency",
    name: "target",
    type: "string",
    default: "",
    description: "Code of the target currency to retrieve the exchange rate for",
    displayOptions: {
      show: {
        resource: ["exchangeRate"],
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
        resource: ["exchangeRate"],
        operation: ["get"]
      }
    },
    options: [
      {
        displayName: "Interval",
        name: "interval",
        type: "options",
        default: "day",
        options: [
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
          }
        ]
      },
      {
        displayName: "Range",
        name: "range",
        type: "fixedCollection",
        placeholder: "Add Range",
        description: "Range of time to retrieve the exchange rate for",
        default: {},
        options: [
          {
            displayName: "Range Properties",
            name: "rangeProperties",
            values: [
              {
                displayName: "Range Start",
                name: "from",
                type: "dateTime",
                default: ""
              },
              {
                displayName: "Range End",
                name: "to",
                type: "dateTime",
                default: ""
              }
            ]
          }
        ]
      },
      {
        displayName: "Time",
        name: "time",
        type: "dateTime",
        default: "",
        description: "Point in time to retrieve the exchange rate for"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exchangeRateFields,
  exchangeRateOperations
});
//# sourceMappingURL=ExchangeRateDescription.js.map