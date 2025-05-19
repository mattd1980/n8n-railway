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
var ConnectorDescription_exports = {};
__export(ConnectorDescription_exports, {
  connectorFields: () => connectorFields,
  connectorOperations: () => connectorOperations
});
module.exports = __toCommonJS(ConnectorDescription_exports);
const connectorOperations = [
  {
    displayName: "Operation",
    name: "operation",
    noDataExpression: true,
    type: "options",
    displayOptions: {
      show: {
        resource: ["connector"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a connector",
        action: "Create a connector"
      }
    ],
    default: "create"
  }
];
const connectorFields = [
  // ----------------------------------------
  //           connector: create
  // ----------------------------------------
  {
    displayName: "Connector Name",
    name: "name",
    description: "Connectors allow you to send Elastic Security cases into other systems (only ServiceNow, Jira, or IBM Resilient)",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Connector Type",
    name: "connectorType",
    type: "options",
    required: true,
    default: ".jira",
    options: [
      {
        name: "IBM Resilient",
        value: ".resilient"
      },
      {
        name: "Jira",
        value: ".jira"
      },
      {
        name: "ServiceNow ITSM",
        value: ".servicenow"
      }
    ],
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "API URL",
    name: "apiUrl",
    type: "string",
    description: "URL of the third-party instance",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Email",
    name: "email",
    description: "Jira-registered email",
    type: "string",
    placeholder: "name@email.com",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".jira"]
      }
    }
  },
  {
    displayName: "API Token",
    name: "apiToken",
    description: "Jira API token",
    type: "string",
    typeOptions: { password: true },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".jira"]
      }
    }
  },
  {
    displayName: "Project Key",
    name: "projectKey",
    description: "Jira Project Key",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".jira"]
      }
    }
  },
  {
    displayName: "Username",
    name: "username",
    description: "ServiceNow ITSM username",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".servicenow"]
      }
    }
  },
  {
    displayName: "Password",
    name: "password",
    description: "ServiceNow ITSM password",
    type: "string",
    typeOptions: { password: true },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".servicenow"]
      }
    }
  },
  {
    displayName: "API Key ID",
    name: "apiKeyId",
    description: "IBM Resilient API key ID",
    type: "string",
    typeOptions: { password: true },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".resilient"]
      }
    }
  },
  {
    displayName: "API Key Secret",
    name: "apiKeySecret",
    description: "IBM Resilient API key secret",
    type: "string",
    typeOptions: { password: true },
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".resilient"]
      }
    }
  },
  {
    displayName: "Organization ID",
    name: "orgId",
    description: "IBM Resilient organization ID",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["connector"],
        operation: ["create"],
        connectorType: [".resilient"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connectorFields,
  connectorOperations
});
//# sourceMappingURL=ConnectorDescription.js.map