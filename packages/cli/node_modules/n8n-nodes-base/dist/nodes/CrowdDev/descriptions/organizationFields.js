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
var organizationFields_exports = {};
__export(organizationFields_exports, {
  organizationFields: () => organizationFields,
  organizationOperations: () => organizationOperations
});
module.exports = __toCommonJS(organizationFields_exports);
var import_utils = require("./utils");
var import_GenericFunctions = require("../GenericFunctions");
const displayOpts = (0, import_utils.showFor)(["organization"]);
const displayFor = {
  resource: displayOpts(),
  createOrUpdate: displayOpts(["create", "update"]),
  id: displayOpts(["delete", "find", "update"])
};
const organizationOperations = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  displayOptions: displayFor.resource.displayOptions,
  noDataExpression: true,
  default: "find",
  options: [
    {
      name: "Create",
      value: "create",
      description: "Create an organization",
      action: "Create an organization",
      routing: {
        send: { preSend: [import_GenericFunctions.organizationPresend] },
        request: {
          method: "POST",
          url: "/organization"
        }
      }
    },
    {
      name: "Delete",
      value: "delete",
      description: "Delete an organization",
      action: "Delete an organization",
      routing: {
        request: {
          method: "DELETE",
          url: "=/organization"
        }
      }
    },
    {
      name: "Find",
      value: "find",
      description: "Find an organization",
      action: "Find an organization",
      routing: {
        request: {
          method: "GET",
          url: '=/organization/{{$parameter["id"]}}'
        }
      }
    },
    {
      name: "Update",
      value: "update",
      description: "Update an organization",
      action: "Update an organization",
      routing: {
        send: { preSend: [import_GenericFunctions.organizationPresend] },
        request: {
          method: "PUT",
          url: '=/organization/{{$parameter["id"]}}'
        }
      }
    }
  ]
};
const commonFields = [
  {
    displayName: "Name",
    name: "name",
    description: "The name of the organization",
    type: "string",
    required: true,
    default: ""
  }
];
const additionalOptions = [
  {
    displayName: "Url",
    name: "url",
    description: "The URL of the organization",
    type: "string",
    default: ""
  },
  {
    displayName: "Description",
    name: "description",
    description: "A short description of the organization",
    type: "string",
    typeOptions: {
      rows: 3
    },
    default: ""
  },
  {
    displayName: "Logo",
    name: "logo",
    description: "A URL for logo of the organization",
    type: "string",
    default: ""
  },
  {
    displayName: "Employees",
    name: "employees",
    description: "The number of employees of the organization",
    type: "number",
    default: ""
  },
  {
    displayName: "Members",
    name: "members",
    description: "Members associated with the organization. Each element in the array is the ID of the member.",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    options: [
      {
        displayName: "Item Choice",
        name: "itemChoice",
        values: [
          {
            displayName: "Member",
            name: "member",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  }
];
const organizationFields = [
  Object.assign((0, import_utils.getId)(), { description: "The ID of the organization" }, displayFor.id),
  ...commonFields.map((0, import_utils.mapWith)(displayFor.createOrUpdate)),
  Object.assign({}, (0, import_utils.getAdditionalOptions)(additionalOptions), displayFor.createOrUpdate)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  organizationFields,
  organizationOperations
});
//# sourceMappingURL=organizationFields.js.map