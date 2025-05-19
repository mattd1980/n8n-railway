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
var VendorDescription_exports = {};
__export(VendorDescription_exports, {
  vendorFields: () => vendorFields,
  vendorOperations: () => vendorOperations
});
module.exports = __toCommonJS(VendorDescription_exports);
var import_VendorAdditionalFieldsOptions = require("./VendorAdditionalFieldsOptions");
const vendorOperations = [
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
        action: "Create a vendor"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a vendor"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many vendors"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a vendor"
      }
    ],
    displayOptions: {
      show: {
        resource: ["vendor"]
      }
    }
  }
];
const vendorFields = [
  // ----------------------------------
  //         vendor: create
  // ----------------------------------
  {
    displayName: "Display Name",
    name: "displayName",
    type: "string",
    required: true,
    default: "",
    description: "The display name of the vendor to create",
    displayOptions: {
      show: {
        resource: ["vendor"],
        operation: ["create"]
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
        resource: ["vendor"],
        operation: ["create"]
      }
    },
    options: import_VendorAdditionalFieldsOptions.vendorAdditionalFieldsOptions
  },
  // ----------------------------------
  //         vendor: get
  // ----------------------------------
  {
    displayName: "Vendor ID",
    name: "vendorId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the vendor to retrieve",
    displayOptions: {
      show: {
        resource: ["vendor"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //         vendor: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["vendor"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["vendor"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        displayName: "Query",
        name: "query",
        type: "string",
        default: "",
        placeholder: "WHERE Metadata.LastUpdatedTime > '2021-01-01'",
        description: 'The condition for selecting vendors. See the <a href="https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/data-queries">guide</a> for supported syntax.'
      }
    ],
    displayOptions: {
      show: {
        resource: ["vendor"],
        operation: ["getAll"]
      }
    }
  },
  // ----------------------------------
  //         vendor: update
  // ----------------------------------
  {
    displayName: "Vendor ID",
    name: "vendorId",
    type: "string",
    required: true,
    default: "",
    description: "The ID of the vendor to update",
    displayOptions: {
      show: {
        resource: ["vendor"],
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
    required: true,
    displayOptions: {
      show: {
        resource: ["vendor"],
        operation: ["update"]
      }
    },
    options: import_VendorAdditionalFieldsOptions.vendorAdditionalFieldsOptions
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vendorFields,
  vendorOperations
});
//# sourceMappingURL=VendorDescription.js.map