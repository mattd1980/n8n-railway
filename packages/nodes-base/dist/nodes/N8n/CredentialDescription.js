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
var CredentialDescription_exports = {};
__export(CredentialDescription_exports, {
  credentialFields: () => credentialFields,
  credentialOperations: () => credentialOperations
});
module.exports = __toCommonJS(CredentialDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const credentialOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "create",
    displayOptions: {
      show: {
        resource: ["credential"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a credential",
        routing: {
          request: {
            method: "POST",
            url: "/credentials"
          }
        }
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a credential",
        routing: {
          request: {
            method: "DELETE",
            url: "=/credentials/{{ $parameter.credentialId }}"
          }
        }
      },
      {
        name: "Get Schema",
        value: "getSchema",
        action: "Get credential data schema for type",
        routing: {
          request: {
            method: "GET",
            url: "=/credentials/schema/{{ $parameter.credentialTypeName }}"
          }
        }
      }
    ]
  }
];
const createOperation = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    placeholder: "e.g. n8n account",
    required: true,
    displayOptions: {
      show: {
        resource: ["credential"],
        operation: ["create"]
      }
    },
    routing: {
      request: {
        body: {
          name: "={{ $value }}"
        }
      }
    },
    description: "Name of the new credential"
  },
  {
    displayName: "Credential Type",
    name: "credentialTypeName",
    type: "string",
    placeholder: "e.g. n8nApi",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["credential"],
        operation: ["create"]
      }
    },
    routing: {
      request: {
        body: {
          type: "={{ $value }}"
        }
      }
    },
    description: "The available types depend on nodes installed on the n8n instance. Some built-in types include e.g. 'githubApi', 'notionApi', and 'slackApi'."
  },
  {
    displayName: "Data",
    name: "data",
    type: "json",
    default: "",
    placeholder: '// e.g. for n8nApi \n{\n  "apiKey": "my-n8n-api-key",\n  "baseUrl": "https://<name>.app.n8n.cloud/api/v1",\n}',
    required: true,
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    displayOptions: {
      show: {
        resource: ["credential"],
        operation: ["create"]
      }
    },
    routing: {
      send: {
        // Validate that the 'data' property is parseable as JSON and
        // set it into the request as body.data.
        preSend: [(0, import_GenericFunctions.parseAndSetBodyJson)("data", "data")]
      }
    },
    description: "A valid JSON object with properties required for this Credential Type. To see the expected format, you can use 'Get Schema' operation."
  }
];
const deleteOperation = [
  {
    displayName: "Credential ID",
    name: "credentialId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["credential"],
        operation: ["delete"]
      }
    }
  }
];
const getSchemaOperation = [
  {
    displayName: "Credential Type",
    name: "credentialTypeName",
    default: "",
    placeholder: "e.g. n8nApi",
    required: true,
    type: "string",
    displayOptions: {
      show: {
        resource: ["credential"],
        operation: ["getSchema"]
      }
    },
    description: "The available types depend on nodes installed on the n8n instance. Some built-in types include e.g. 'githubApi', 'notionApi', and 'slackApi'."
  }
];
const credentialFields = [
  ...createOperation,
  ...deleteOperation,
  ...getSchemaOperation
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  credentialFields,
  credentialOperations
});
//# sourceMappingURL=CredentialDescription.js.map