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
var QuoteDescription_exports = {};
__export(QuoteDescription_exports, {
  quoteFields: () => quoteFields,
  quoteOperations: () => quoteOperations
});
module.exports = __toCommonJS(QuoteDescription_exports);
const quoteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a quote"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a quote"
      }
    ],
    displayOptions: {
      show: {
        resource: ["quote"]
      }
    }
  }
];
const quoteFields = [
  // ----------------------------------
  //         quote: create
  // ----------------------------------
  {
    displayName: "Profile Name or ID",
    name: "profileId",
    type: "options",
    required: true,
    default: [],
    typeOptions: {
      loadOptionsMethod: "getProfiles"
    },
    description: 'ID of the user profile to create the quote under. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Target Account Name or ID",
    name: "targetAccountId",
    type: "options",
    required: true,
    default: [],
    typeOptions: {
      loadOptionsMethod: "getRecipients"
    },
    description: 'ID of the account that will receive the funds. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Amount Type",
    name: "amountType",
    type: "options",
    default: "source",
    options: [
      {
        name: "Source",
        value: "source"
      },
      {
        name: "Target",
        value: "target"
      }
    ],
    description: "Whether the amount is to be sent or received",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Amount",
    name: "amount",
    type: "number",
    default: 1,
    typeOptions: {
      minValue: 1
    },
    description: "Amount of funds for the quote to create",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Source Currency",
    name: "sourceCurrency",
    type: "string",
    default: "",
    description: "Code of the currency to send for the quote to create",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Target Currency",
    name: "targetCurrency",
    type: "string",
    default: "",
    description: "Code of the currency to receive for the quote to create",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------
  //         quote: get
  // ----------------------------------
  {
    displayName: "Quote ID",
    name: "quoteId",
    type: "string",
    required: true,
    default: "",
    description: "ID of the quote to retrieve",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["get"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  quoteFields,
  quoteOperations
});
//# sourceMappingURL=QuoteDescription.js.map