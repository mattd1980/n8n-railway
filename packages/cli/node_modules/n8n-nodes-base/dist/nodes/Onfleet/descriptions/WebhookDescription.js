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
var WebhookDescription_exports = {};
__export(WebhookDescription_exports, {
  webhookFields: () => webhookFields,
  webhookOperations: () => webhookOperations
});
module.exports = __toCommonJS(WebhookDescription_exports);
var import_WebhookMapping = require("../WebhookMapping");
const webhookOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["webhook"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new Onfleet webhook",
        action: "Create a webhook"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an Onfleet webhook",
        action: "Delete a webhook"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many Onfleet webhooks",
        action: "Get many webhooks"
      }
    ],
    default: "getAll"
  }
];
const urlField = {
  displayName: "URL",
  name: "url",
  type: "string",
  default: "",
  description: "The URL that Onfleet should issue a request against as soon as the trigger condition is met. It must be HTTPS and have a valid certificate."
};
const nameField = {
  displayName: "Name",
  name: "name",
  type: "string",
  default: "",
  description: "A name for the webhook for identification"
};
const triggerField = {
  displayName: "Trigger",
  name: "trigger",
  type: "options",
  options: Object.entries(import_WebhookMapping.webhookMapping).map(([_key, value]) => {
    return {
      name: value.name,
      value: value.key
    };
  }),
  default: "",
  description: "The number corresponding to the trigger condition on which the webhook should fire"
};
const thresholdField = {
  displayName: "Threshold",
  name: "threshold",
  type: "number",
  default: 0,
  description: "For trigger Task Eta, the time threshold in seconds; for trigger Task Arrival, the distance threshold in meters"
};
const webhookFields = [
  {
    displayName: "Webhook ID",
    name: "id",
    type: "string",
    displayOptions: {
      show: {
        resource: ["webhook"],
        operation: ["delete"]
      }
    },
    default: "",
    required: true,
    description: "The ID of the webhook object for lookup"
  },
  {
    ...urlField,
    displayOptions: {
      show: {
        resource: ["webhook"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    ...nameField,
    displayOptions: {
      show: {
        resource: ["webhook"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    ...triggerField,
    displayOptions: {
      show: {
        resource: ["webhook"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["webhook"],
        operation: ["create"]
      }
    },
    options: [thresholdField]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  webhookFields,
  webhookOperations
});
//# sourceMappingURL=WebhookDescription.js.map