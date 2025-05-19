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
var automationFields_exports = {};
__export(automationFields_exports, {
  automationFields: () => automationFields,
  automationOperations: () => automationOperations
});
module.exports = __toCommonJS(automationFields_exports);
var import_utils = require("./utils");
var import_GenericFunctions = require("../GenericFunctions");
const displayOpts = (0, import_utils.showFor)(["automation"]);
const displayFor = {
  resource: displayOpts(),
  createOrUpdate: displayOpts(["create", "update"]),
  id: displayOpts(["destroy", "find", "update"])
};
const automationOperations = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  displayOptions: displayFor.resource.displayOptions,
  noDataExpression: true,
  default: "list",
  options: [
    {
      name: "Create",
      value: "create",
      description: "Create a new automation for the tenant",
      action: "Create a new automation for the tenant",
      routing: {
        send: { preSend: [import_GenericFunctions.automationPresend] },
        request: {
          method: "POST",
          url: "/automation"
        }
      }
    },
    {
      name: "Destroy",
      value: "destroy",
      description: "Destroy an existing automation for the tenant",
      action: "Destroy an existing automation for the tenant",
      routing: {
        request: {
          method: "DELETE",
          url: '=/automation/{{$parameter["id"]}}'
        }
      }
    },
    {
      name: "Find",
      value: "find",
      description: "Get an existing automation data for the tenant",
      action: "Get an existing automation data for the tenant",
      routing: {
        request: {
          method: "GET",
          url: '=/automation/{{$parameter["id"]}}'
        }
      }
    },
    {
      name: "List",
      value: "list",
      description: "Get all existing automation data for tenant",
      action: "Get all existing automation data for tenant",
      routing: {
        request: {
          method: "GET",
          url: "/automation"
        }
      }
    },
    {
      name: "Update",
      value: "update",
      description: "Updates an existing automation for the tenant",
      action: "Updates an existing automation for the tenant",
      routing: {
        send: { preSend: [import_GenericFunctions.automationPresend] },
        request: {
          method: "PUT",
          url: '=/automation/{{$parameter["id"]}}'
        }
      }
    }
  ]
};
const idField = {
  displayName: "ID",
  name: "id",
  description: "The ID of the automation",
  type: "string",
  required: true,
  default: ""
};
const commonFields = [
  {
    displayName: "Trigger",
    name: "trigger",
    description: "What will trigger an automation",
    type: "options",
    required: true,
    default: "new_activity",
    options: [
      {
        name: "New Activity",
        value: "new_activity"
      },
      {
        name: "New Member",
        value: "new_member"
      }
    ]
  },
  {
    displayName: "URL",
    name: "url",
    description: "URL to POST webhook data to",
    type: "string",
    required: true,
    default: ""
  }
];
const automationFields = [
  Object.assign({}, idField, displayFor.id),
  ...commonFields.map((0, import_utils.mapWith)(displayFor.createOrUpdate))
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  automationFields,
  automationOperations
});
//# sourceMappingURL=automationFields.js.map