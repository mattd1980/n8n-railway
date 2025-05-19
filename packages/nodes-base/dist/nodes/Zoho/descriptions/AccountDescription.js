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
var AccountDescription_exports = {};
__export(AccountDescription_exports, {
  accountFields: () => accountFields,
  accountOperations: () => accountOperations
});
module.exports = __toCommonJS(AccountDescription_exports);
var import_SharedFields = require("./SharedFields");
const accountOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["account"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an account",
        action: "Create an account"
      },
      {
        name: "Create or Update",
        value: "upsert",
        description: "Create a new record, or update the current one if it already exists (upsert)",
        action: "Create or Update an account"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an account",
        action: "Delete an account"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an account",
        action: "Get an account"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many accounts",
        action: "Get many accounts"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an account",
        action: "Update an account"
      }
    ],
    default: "create"
  }
];
const accountFields = [
  // ----------------------------------------
  //            account: create
  // ----------------------------------------
  {
    displayName: "Account Name",
    name: "accountName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------------
  //          account: upsert
  // ----------------------------------------
  {
    displayName: "Account Name",
    name: "accountName",
    description: "Name of the account. If a record with this account name exists it will be updated, otherwise a new one will be created.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["upsert"]
      }
    }
  },
  // ----------------------------------------
  //        account: create + upsert
  // ----------------------------------------
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["create", "upsert"]
      }
    },
    options: [
      {
        displayName: "Account Number",
        name: "Account_Number",
        type: "string",
        default: ""
      },
      {
        displayName: "Account Site",
        name: "Account_Site",
        type: "string",
        default: "",
        description: "Name of the account\u2019s location, e.g. Headquarters or London"
      },
      {
        displayName: "Account Type Name or ID",
        name: "Account_Type",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getAccountType"
        },
        default: []
      },
      {
        displayName: "Annual Revenue",
        name: "Annual_Revenue",
        type: "number",
        default: ""
      },
      import_SharedFields.billingAddress,
      {
        displayName: "Contact Details",
        name: "Contact_Details",
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
      (0, import_SharedFields.makeCustomFieldsFixedCollection)("account"),
      {
        displayName: "Description",
        name: "Description",
        type: "string",
        default: ""
      },
      {
        displayName: "Employees",
        name: "Employees",
        type: "number",
        default: "",
        description: "Number of employees in the account\u2019s company"
      },
      {
        displayName: "Exchange Rate",
        name: "Exchange_Rate",
        type: "number",
        default: "",
        description: "Exchange rate of the default currency to the home currency"
      },
      {
        displayName: "Fax",
        name: "Fax",
        type: "string",
        default: ""
      },
      {
        displayName: "Industry",
        name: "Industry",
        type: "string",
        default: ""
      },
      {
        displayName: "Phone",
        name: "Phone",
        type: "string",
        default: ""
      },
      import_SharedFields.shippingAddress,
      {
        displayName: "Ticker Symbol",
        name: "Ticker_Symbol",
        type: "string",
        default: ""
      },
      {
        displayName: "Website",
        name: "Website",
        type: "string",
        default: ""
      }
    ]
  },
  // ----------------------------------------
  //             account: delete
  // ----------------------------------------
  {
    displayName: "Account ID",
    name: "accountId",
    description: "ID of the account to delete. Can be found at the end of the URL.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //               account: get
  // ----------------------------------------
  {
    displayName: "Account ID",
    name: "accountId",
    description: "ID of the account to retrieve. Can be found at the end of the URL.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["account"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //             account: getAll
  // ----------------------------------------
  ...(0, import_SharedFields.makeGetAllFields)("account"),
  // ----------------------------------------
  //             account: update
  // ----------------------------------------
  {
    displayName: "Account ID",
    name: "accountId",
    description: "ID of the account to update. Can be found at the end of the URL.",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["account"],
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
        resource: ["account"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Account Name",
        name: "Account_Name",
        type: "string",
        default: ""
      },
      {
        displayName: "Account Number",
        name: "Account_Number",
        type: "string",
        default: ""
      },
      {
        displayName: "Account Site",
        name: "Account_Site",
        type: "string",
        default: "",
        description: "Name of the account\u2019s location, e.g. Headquarters or London"
      },
      {
        displayName: "Account Type Name or ID",
        name: "Account_Type",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getAccountType"
        },
        default: []
      },
      {
        displayName: "Annual Revenue",
        name: "Annual_Revenue",
        type: "number",
        default: ""
      },
      import_SharedFields.billingAddress,
      {
        displayName: "Contact Details",
        name: "Contact_Details",
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
      (0, import_SharedFields.makeCustomFieldsFixedCollection)("account"),
      {
        displayName: "Description",
        name: "Description",
        type: "string",
        default: ""
      },
      {
        displayName: "Employees",
        name: "Employees",
        type: "number",
        default: "",
        description: "Number of employees in the account\u2019s company"
      },
      {
        displayName: "Exchange Rate",
        name: "Exchange_Rate",
        type: "number",
        default: "",
        description: "Exchange rate of the default currency to the home currency"
      },
      {
        displayName: "Fax",
        name: "Fax",
        type: "string",
        default: ""
      },
      {
        displayName: "Industry",
        name: "Industry",
        type: "string",
        default: ""
      },
      {
        displayName: "Phone",
        name: "Phone",
        type: "string",
        default: ""
      },
      import_SharedFields.shippingAddress,
      {
        displayName: "Ticker Symbol",
        name: "Ticker_Symbol",
        type: "string",
        default: ""
      },
      {
        displayName: "Website",
        name: "Website",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accountFields,
  accountOperations
});
//# sourceMappingURL=AccountDescription.js.map