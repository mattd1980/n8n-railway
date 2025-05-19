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
var LeadDescription_exports = {};
__export(LeadDescription_exports, {
  leadFields: () => leadFields,
  leadOperations: () => leadOperations
});
module.exports = __toCommonJS(LeadDescription_exports);
var import_sharedFields = require("../utils/sharedFields");
const leadOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["lead"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a lead"
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a lead"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a lead"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many leads"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a lead"
      }
    ],
    default: "create"
  }
];
const leadFields = [
  // ----------------------------------------
  //               lead: create
  // ----------------------------------------
  {
    displayName: "Name",
    name: "name",
    description: "Name of the lead to create",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["create"]
      }
    },
    options: [import_sharedFields.addressFixedCollection, import_sharedFields.emailFixedCollection, import_sharedFields.phoneNumbersFixedCollection]
  },
  // ----------------------------------------
  //               lead: delete
  // ----------------------------------------
  {
    displayName: "Lead ID",
    name: "leadId",
    description: "ID of the lead to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                lead: get
  // ----------------------------------------
  {
    displayName: "Lead ID",
    name: "leadId",
    description: "ID of the lead to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //               lead: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 5,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filterFields",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["lead"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "",
        description: "Name of the country to filter by"
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Name of the lead to filter by"
      }
    ]
  },
  // ----------------------------------------
  //               lead: update
  // ----------------------------------------
  {
    displayName: "Lead ID",
    name: "leadId",
    description: "ID of the lead to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["lead"],
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
        resource: ["lead"],
        operation: ["update"]
      }
    },
    options: [
      import_sharedFields.addressFixedCollection,
      {
        displayName: "Details",
        name: "details",
        type: "string",
        default: "",
        description: "Description to set for the lead"
      },
      import_sharedFields.emailFixedCollection,
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Name to set for the lead"
      },
      import_sharedFields.phoneNumbersFixedCollection
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  leadFields,
  leadOperations
});
//# sourceMappingURL=LeadDescription.js.map