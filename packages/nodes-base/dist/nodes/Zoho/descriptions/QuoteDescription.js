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
var import_SharedFields = require("./SharedFields");
const quoteOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["quote"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a quote",
        action: "Create a quote"
      },
      {
        name: "Create or Update",
        value: "upsert",
        description: "Create a new record, or update the current one if it already exists (upsert)",
        action: "Create or update a quote"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a quote",
        action: "Delete a quote"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a quote",
        action: "Get a quote"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many quotes",
        action: "Get many quotes"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a quote",
        action: "Update a quote"
      }
    ],
    default: "create"
  }
];
const quoteFields = [
  // ----------------------------------------
  //            quote: create
  // ----------------------------------------
  {
    displayName: "Subject",
    name: "subject",
    description: "Subject or title of the quote",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------------
  //            quote: upsert
  // ----------------------------------------
  {
    displayName: "Subject",
    name: "subject",
    description: "Subject or title of the quote. If a record with this subject exists it will be updated, otherwise a new one will be created.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["upsert"]
      }
    }
  },
  // ----------------------------------------
  //          quote: create + upsert
  // ----------------------------------------
  {
    displayName: "Products",
    name: "Product_Details",
    type: "collection",
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: "Add Product"
    },
    default: {},
    placeholder: "Add Field",
    options: import_SharedFields.productDetailsOptions,
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["create", "upsert"]
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
        resource: ["quote"],
        operation: ["create", "upsert"]
      }
    },
    options: [
      {
        displayName: "Adjustment",
        name: "Adjustment",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Adjustment in the grand total, if any"
      },
      import_SharedFields.billingAddress,
      {
        displayName: "Carrier",
        name: "Carrier",
        type: "string",
        default: ""
      },
      {
        displayName: "Currency",
        name: "Currency",
        type: "options",
        default: "USD",
        description: "Symbol of the currency in which revenue is generated",
        options: import_SharedFields.currencies
      },
      (0, import_SharedFields.makeCustomFieldsFixedCollection)("quote"),
      {
        displayName: "Description",
        name: "Description",
        type: "string",
        default: ""
      },
      {
        displayName: "Exchange Rate",
        name: "Exchange_Rate",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Exchange rate of the default currency to the home currency"
      },
      {
        displayName: "Grand Total",
        name: "Grand_Total",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Total amount for the product after deducting tax and discounts"
      },
      {
        displayName: "Quote Stage Name or ID",
        name: "Quote_Stage",
        type: "options",
        default: [],
        typeOptions: {
          loadOptionsMethod: "getQuoteStage"
        },
        description: 'Stage of the quote. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      import_SharedFields.shippingAddress,
      {
        displayName: "Sub Total",
        name: "Sub_Total",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Total amount for the product excluding tax"
      },
      {
        displayName: "Tax",
        name: "Tax",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Total amount as the sum of sales tax and value-added tax"
      },
      {
        displayName: "Team",
        name: "Team",
        type: "string",
        default: "",
        description: "Team for whom the quote is created"
      },
      {
        displayName: "Terms and Conditions",
        name: "Terms_and_Conditions",
        type: "string",
        default: "",
        description: "Terms and conditions associated with the quote"
      },
      {
        displayName: "Valid Till",
        name: "Valid_Till",
        type: "dateTime",
        default: "",
        description: "Date until when the quote is valid"
      }
    ]
  },
  // ----------------------------------------
  //              quote: delete
  // ----------------------------------------
  {
    displayName: "Quote ID",
    name: "quoteId",
    description: "ID of the quote to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                quote: get
  // ----------------------------------------
  {
    displayName: "Quote ID",
    name: "quoteId",
    description: "ID of the quote to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //              quote: getAll
  // ----------------------------------------
  ...(0, import_SharedFields.makeGetAllFields)("quote"),
  // ----------------------------------------
  //              quote: update
  // ----------------------------------------
  {
    displayName: "Quote ID",
    name: "quoteId",
    description: "ID of the quote to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["quote"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Adjustment",
        name: "Adjustment",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Adjustment in the grand total, if any"
      },
      import_SharedFields.billingAddress,
      {
        displayName: "Carrier",
        name: "Carrier",
        type: "string",
        default: ""
      },
      {
        displayName: "Currency",
        name: "Currency",
        type: "options",
        default: "USD",
        description: "Symbol of the currency in which revenue is generated",
        options: import_SharedFields.currencies
      },
      (0, import_SharedFields.makeCustomFieldsFixedCollection)("quote"),
      {
        displayName: "Description",
        name: "Description",
        type: "string",
        default: ""
      },
      {
        displayName: "Exchange Rate",
        name: "Exchange_Rate",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Exchange rate of the default currency to the home currency"
      },
      {
        displayName: "Grand Total",
        name: "Grand_Total",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Total amount for the product after deducting tax and discounts"
      },
      {
        displayName: "Quote Stage Name or ID",
        name: "Quote_Stage",
        type: "options",
        default: [],
        typeOptions: {
          loadOptionsMethod: "getQuoteStage"
        },
        description: 'Stage of the quote. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      import_SharedFields.shippingAddress,
      {
        displayName: "Sub Total",
        name: "Sub_Total",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Total amount for the product excluding tax"
      },
      {
        displayName: "Subject",
        name: "Subject",
        type: "string",
        default: "",
        description: "Subject or title of the quote"
      },
      {
        displayName: "Tax",
        name: "Tax",
        type: "number",
        default: 0,
        typeOptions: {
          minValue: 0
        },
        description: "Tax amount as the sum of sales tax and value-added tax"
      },
      {
        displayName: "Team",
        name: "Team",
        type: "string",
        default: "",
        description: "Team for whom the quote is created"
      },
      {
        displayName: "Terms and Conditions",
        name: "Terms_and_Conditions",
        type: "string",
        default: "",
        description: "Terms and conditions associated with the quote"
      },
      {
        displayName: "Valid Till",
        name: "Valid_Till",
        type: "dateTime",
        default: "",
        description: "Date until when the quote is valid"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  quoteFields,
  quoteOperations
});
//# sourceMappingURL=QuoteDescription.js.map