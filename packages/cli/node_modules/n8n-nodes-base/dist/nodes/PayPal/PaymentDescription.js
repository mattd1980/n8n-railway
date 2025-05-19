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
var PaymentDescription_exports = {};
__export(PaymentDescription_exports, {
  payoutFields: () => payoutFields,
  payoutItemFields: () => payoutItemFields,
  payoutItemOperations: () => payoutItemOperations,
  payoutOperations: () => payoutOperations
});
module.exports = __toCommonJS(PaymentDescription_exports);
const payoutOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["payout"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a batch payout",
        action: "Create a payout"
      },
      {
        name: "Get",
        value: "get",
        description: "Show batch payout details",
        action: "Get a payout"
      }
    ],
    default: "create"
  }
];
const payoutFields = [
  /* -------------------------------------------------------------------------- */
  /*                                payout:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Sender Batch ID",
    name: "senderBatchId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["payout"],
        operation: ["create"]
      }
    },
    default: "",
    description: "A sender-specified ID number. Tracks the payout in an accounting system."
  },
  {
    displayName: "JSON Parameters",
    name: "jsonParameters",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["payout"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Items",
    name: "itemsUi",
    placeholder: "Add Item",
    type: "fixedCollection",
    displayOptions: {
      show: {
        resource: ["payout"],
        operation: ["create"],
        jsonParameters: [false]
      }
    },
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        name: "itemsValues",
        displayName: "Item",
        values: [
          {
            displayName: "Recipient Type",
            name: "recipientType",
            type: "options",
            options: [
              {
                name: "Phone",
                value: "phone",
                description: "The unencrypted phone number"
              },
              {
                name: "Email",
                value: "email",
                description: "The unencrypted email"
              },
              {
                name: "PayPal ID",
                value: "paypalId",
                description: "The encrypted PayPal account number"
              }
            ],
            default: "email",
            description: "The ID type that identifies the recipient of the payment"
          },
          {
            displayName: "Receiver Value",
            name: "receiverValue",
            type: "string",
            required: true,
            default: "",
            description: "The receiver of the payment. Corresponds to the recipient_type value in the request. Max length: 127 characters."
          },
          {
            displayName: "Currency",
            name: "currency",
            type: "options",
            options: [
              {
                name: "Australian Dollar",
                value: "AUD"
              },
              {
                name: "Brazilian Real",
                value: "BRL"
              },
              {
                name: "Canadian Dollar",
                value: "CAD"
              },
              {
                name: "Czech Koruna",
                value: "CZK"
              },
              {
                name: "Danish Krone",
                value: "DKK"
              },
              {
                name: "Euro",
                value: "EUR"
              },
              {
                name: "United States Dollar",
                value: "USD"
              }
            ],
            default: "USD"
          },
          {
            displayName: "Amount",
            name: "amount",
            type: "string",
            required: true,
            default: "",
            description: "The value, which might be"
          },
          {
            displayName: "Note",
            name: "note",
            type: "string",
            default: "",
            description: "The sender-specified note for notifications. Supports up to 4000 ASCII characters and 1000 non-ASCII characters."
          },
          {
            displayName: "Sender Item ID",
            name: "senderItemId",
            type: "string",
            default: "",
            description: "The sender-specified ID number. Tracks the payout in an accounting system."
          },
          {
            displayName: "Recipient Wallet",
            name: "recipientWallet",
            type: "options",
            options: [
              {
                name: "PayPal",
                value: "paypal",
                description: "PayPal Wallet"
              },
              {
                name: "Venmo",
                value: "venmo",
                description: "Venmo Wallet"
              }
            ],
            default: "paypal"
          }
        ]
      }
    ]
  },
  {
    displayName: "Items",
    name: "itemsJson",
    type: "json",
    default: "",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    description: "An array of individual payout items",
    displayOptions: {
      show: {
        resource: ["payout"],
        operation: ["create"],
        jsonParameters: [true]
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
        resource: ["payout"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Email Subject",
        name: "emailSubject",
        type: "string",
        default: "",
        description: "The subject line for the email that PayPal sends when payment for a payout item completes. The subject line is the same for all recipients. Max length: 255 characters."
      },
      {
        displayName: "Email Message",
        name: "emailMessage",
        type: "string",
        default: "",
        description: "The email message that PayPal sends when the payout item completes. The message is the same for all recipients."
      },
      {
        displayName: "Note",
        name: "note",
        type: "string",
        default: "",
        description: "The payouts and item-level notes are concatenated in the email. Max length: 1000 characters."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 payout:get                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Payout Batch ID",
    name: "payoutBatchId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["payout"],
        operation: ["get"]
      }
    },
    description: "The ID of the payout for which to show details"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["payout"],
        operation: ["get"]
      }
    },
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    typeOptions: {
      maxValue: 1e3,
      minValue: 1
    },
    default: 100,
    displayOptions: {
      show: {
        resource: ["payout"],
        operation: ["get"],
        returnAll: [false]
      }
    },
    description: "Max number of results to return"
  }
];
const payoutItemOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["payoutItem"]
      }
    },
    options: [
      {
        name: "Cancel",
        value: "cancel",
        description: "Cancels an unclaimed payout item",
        action: "Cancel a payout item"
      },
      {
        name: "Get",
        value: "get",
        description: "Show payout item details",
        action: "Get a payout item"
      }
    ],
    default: "get"
  }
];
const payoutItemFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 payoutItem:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Payout Item ID",
    name: "payoutItemId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["payoutItem"],
        operation: ["get"]
      }
    },
    description: "The ID of the payout item for which to show details"
  },
  /* -------------------------------------------------------------------------- */
  /*                                payoutItem:cancel                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Payout Item ID",
    name: "payoutItemId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["payoutItem"],
        operation: ["cancel"]
      }
    },
    description: "The ID of the payout item to cancel"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  payoutFields,
  payoutItemFields,
  payoutItemOperations,
  payoutOperations
});
//# sourceMappingURL=PaymentDescription.js.map