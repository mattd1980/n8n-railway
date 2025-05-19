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
var SignatureDescription_exports = {};
__export(SignatureDescription_exports, {
  signatureFields: () => signatureFields,
  signatureOperations: () => signatureOperations
});
module.exports = __toCommonJS(SignatureDescription_exports);
var import_SharedFields = require("./SharedFields");
const signatureOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["signature"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a signature"
      },
      {
        name: "Get",
        value: "get",
        action: "Get a signature"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many signatures"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a signature"
      }
    ],
    default: "create"
  }
];
const signatureFields = [
  // ----------------------------------------
  //            signature: create
  // ----------------------------------------
  {
    displayName: "Petition ID",
    name: "petitionId",
    description: "ID of the petition to sign",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Person ID",
    name: "personId",
    description: "ID of the person whose signature to create",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["create"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("signature", "create"),
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Comments",
        name: "comments",
        type: "string",
        default: "",
        description: "Comments to leave when signing this petition"
      }
    ]
  },
  // ----------------------------------------
  //              signature: get
  // ----------------------------------------
  {
    displayName: "Petition ID",
    name: "petitionId",
    description: "ID of the petition whose signature to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "Signature ID",
    name: "signatureId",
    description: "ID of the signature to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["get"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("signature", "get"),
  // ----------------------------------------
  //            signature: getAll
  // ----------------------------------------
  {
    displayName: "Petition ID",
    name: "petitionId",
    description: "ID of the petition whose signatures to retrieve",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["signature"],
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
        resource: ["signature"],
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
        resource: ["signature"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("signature", "getAll"),
  // ----------------------------------------
  //            signature: update
  // ----------------------------------------
  {
    displayName: "Petition ID",
    name: "petitionId",
    description: "ID of the petition whose signature to update",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Signature ID",
    name: "signatureId",
    description: "ID of the signature to update",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["update"]
      }
    }
  },
  (0, import_SharedFields.makeSimpleField)("signature", "update"),
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["signature"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Comments",
        name: "comments",
        type: "string",
        default: "",
        description: "Comments to leave when signing this petition"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signatureFields,
  signatureOperations
});
//# sourceMappingURL=SignatureDescription.js.map