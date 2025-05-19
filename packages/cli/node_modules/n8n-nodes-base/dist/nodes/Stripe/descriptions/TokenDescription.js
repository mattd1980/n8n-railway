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
var TokenDescription_exports = {};
__export(TokenDescription_exports, {
  tokenFields: () => tokenFields,
  tokenOperations: () => tokenOperations
});
module.exports = __toCommonJS(TokenDescription_exports);
const tokenOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "create",
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a token",
        action: "Create a token"
      }
    ],
    displayOptions: {
      show: {
        resource: ["token"]
      }
    }
  }
];
const tokenFields = [
  // ----------------------------------
  //          token: create
  // ----------------------------------
  {
    displayName: "Type",
    name: "type",
    type: "options",
    required: true,
    default: "cardToken",
    description: "Type of token to create",
    options: [
      {
        name: "Card Token",
        value: "cardToken"
      }
    ],
    displayOptions: {
      show: {
        resource: ["token"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Card Number",
    name: "number",
    type: "string",
    displayOptions: {
      show: {
        resource: ["token"],
        operation: ["create"],
        type: ["cardToken"]
      }
    },
    placeholder: "4242424242424242",
    default: ""
  },
  {
    displayName: "CVC",
    name: "cvc",
    type: "string",
    displayOptions: {
      show: {
        resource: ["token"],
        operation: ["create"],
        type: ["cardToken"]
      }
    },
    default: "",
    placeholder: "314",
    description: "Security code printed on the back of the card"
  },
  {
    displayName: "Expiration Month",
    description: "Number of the month when the card will expire",
    name: "expirationMonth",
    type: "string",
    displayOptions: {
      show: {
        resource: ["token"],
        operation: ["create"],
        type: ["cardToken"]
      }
    },
    default: "",
    placeholder: "10"
  },
  {
    displayName: "Expiration Year",
    description: "Year when the card will expire",
    name: "expirationYear",
    type: "string",
    displayOptions: {
      show: {
        resource: ["token"],
        operation: ["create"],
        type: ["cardToken"]
      }
    },
    default: "",
    placeholder: "2022"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tokenFields,
  tokenOperations
});
//# sourceMappingURL=TokenDescription.js.map