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
var PetitionDescription_exports = {};
__export(PetitionDescription_exports, {
  petitionFields: () => petitionFields,
  petitionOperations: () => petitionOperations
});
module.exports = __toCommonJS(PetitionDescription_exports);
var import_SharedFields = require("./SharedFields");
const petitionOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["petition"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a petition"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a petition"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many petitions"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a petition"
      }
    ],
    default: "create"
  }
];
const petitionFields = [
  // ----------------------------------------
  //             petition: create
  // ----------------------------------------
  {
    displayName: "Origin System",
    name: "originSystem",
    description: "Source where the petition originated",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["petition"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Title",
    name: "title",
    description: "Title of the petition to create",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["petition"],
        operation: ["create"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("petition", "create"),
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["petition"],
        operation: ["create"]
      }
    },
    options: import_SharedFields.petitionAdditionalFieldsOptions
  },
  // ----------------------------------------
  //              petition: get
  // ----------------------------------------
  {
    displayName: "Petition ID",
    name: "petitionId",
    description: "ID of the petition to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["petition"],
        operation: ["get"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("petition", "get"),
  // ----------------------------------------
  //             petition: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["petition"],
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
        resource: ["petition"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("petition", "getAll"),
  // ----------------------------------------
  //             petition: update
  // ----------------------------------------
  {
    displayName: "Petition ID",
    name: "petitionId",
    description: "ID of the petition to update",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["petition"],
        operation: ["update"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("petition", "update"),
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["petition"],
        operation: ["update"]
      }
    },
    options: import_SharedFields.petitionAdditionalFieldsOptions
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  petitionFields,
  petitionOperations
});
//# sourceMappingURL=PetitionDescription.js.map