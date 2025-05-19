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
var CallDescription_exports = {};
__export(CallDescription_exports, {
  callFields: () => callFields,
  callOperations: () => callOperations
});
module.exports = __toCommonJS(CallDescription_exports);
const callOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["call"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a call",
        action: "Create a call"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a call",
        action: "Delete a call"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a call",
        action: "Get a call"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many calls",
        action: "Get many calls"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a call",
        action: "Update a call"
      }
    ],
    default: "create"
  }
];
const callFields = [
  // ----------------------------------------
  //               call: create
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact to associate the call with",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Called At",
    name: "calledAt",
    description: "Date when the call happened",
    type: "dateTime",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Description",
    name: "content",
    description: "Description of the call - max 100,000 characters",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------------
  //               call: delete
  // ----------------------------------------
  {
    displayName: "Call ID",
    name: "callId",
    description: "ID of the call to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //                call: get
  // ----------------------------------------
  {
    displayName: "Call ID",
    name: "callId",
    description: "ID of the call to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //               call: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["call"],
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
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["call"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //               call: update
  // ----------------------------------------
  {
    displayName: "Call ID",
    name: "callId",
    description: "ID of the call to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["call"],
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
        resource: ["call"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Called At",
        name: "calledAt",
        description: "Date when the call happened",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Contact ID",
        name: "contactId",
        description: "ID of the contact to associate the call with",
        type: "string",
        default: ""
      },
      {
        displayName: "Description",
        name: "content",
        description: "Description of the call - max 100,000 characters",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  callFields,
  callOperations
});
//# sourceMappingURL=CallDescription.js.map