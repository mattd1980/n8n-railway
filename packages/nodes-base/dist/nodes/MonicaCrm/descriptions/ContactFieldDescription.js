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
var ContactFieldDescription_exports = {};
__export(ContactFieldDescription_exports, {
  contactFieldFields: () => contactFieldFields,
  contactFieldOperations: () => contactFieldOperations
});
module.exports = __toCommonJS(ContactFieldDescription_exports);
const contactFieldOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["contactField"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a contact field",
        action: "Create a contact field"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a contact field",
        action: "Delete a contact field"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a contact field",
        action: "Get a contact field"
      },
      // {
      // 	name: 'Get All',
      // 	value: 'getAll',
      // 	description: 'Retrieve all contact fields',
      // },
      {
        name: "Update",
        value: "update",
        description: "Update a contact field",
        action: "Update a contact field"
      }
    ],
    default: "create"
  }
];
const contactFieldFields = [
  // ----------------------------------------
  //           contactField: create
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact to associate the contact field with",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Contact Field Type Name or ID",
    name: "contactFieldTypeId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    required: true,
    typeOptions: {
      loadOptionsMethod: "getContactFieldTypes"
    },
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Content",
    name: "data",
    description: "Content of the contact field - max 255 characters",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["create"]
      }
    }
  },
  // ----------------------------------------
  //           contactField: delete
  // ----------------------------------------
  {
    displayName: "Contact Field ID",
    name: "contactFieldId",
    description: "ID of the contactField to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //            contactField: get
  // ----------------------------------------
  {
    displayName: "Contact Field ID",
    name: "contactFieldId",
    description: "ID of the contact field to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //           contactField: getAll
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact whose fields to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["contactField"],
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
        resource: ["contactField"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //           contactField: update
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    description: "ID of the contact to associate the contact field with",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Contact Field ID",
    name: "contactFieldId",
    description: "ID of the contact field to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Contact Field Type Name or ID",
    name: "contactFieldTypeId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getContactFieldTypes"
    },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Content",
    name: "data",
    description: "Content of the contact field - max 255 characters",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["contactField"],
        operation: ["update"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contactFieldFields,
  contactFieldOperations
});
//# sourceMappingURL=ContactFieldDescription.js.map