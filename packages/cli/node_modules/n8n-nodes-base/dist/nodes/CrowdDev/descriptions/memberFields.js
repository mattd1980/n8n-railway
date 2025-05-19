"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var memberFields_exports = {};
__export(memberFields_exports, {
  memberFields: () => memberFields,
  memberOperations: () => memberOperations
});
module.exports = __toCommonJS(memberFields_exports);
var shared = __toESM(require("./shared"));
var import_utils = require("./utils");
var import_GenericFunctions = require("../GenericFunctions");
const displayOpts = (0, import_utils.showFor)(["member"]);
const displayFor = {
  resource: displayOpts(),
  createOrUpdate: displayOpts(["createOrUpdate", "update"]),
  id: displayOpts(["delete", "find", "update"])
};
const memberOperations = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  displayOptions: displayFor.resource.displayOptions,
  noDataExpression: true,
  default: "find",
  options: [
    {
      name: "Create or Update",
      value: "createOrUpdate",
      description: "Create or update a member",
      action: "Create or update a member",
      routing: {
        send: { preSend: [import_GenericFunctions.memberPresend] },
        request: {
          method: "POST",
          url: "/member"
        }
      }
    },
    {
      name: "Delete",
      value: "delete",
      description: "Delete a member",
      action: "Delete a member",
      routing: {
        request: {
          method: "DELETE",
          url: "=/member"
        }
      }
    },
    {
      name: "Find",
      value: "find",
      description: "Find a member",
      action: "Find a member",
      routing: {
        request: {
          method: "GET",
          url: '=/member/{{$parameter["id"]}}'
        }
      }
    },
    {
      name: "Update",
      value: "update",
      description: "Update a member",
      action: "Update a member",
      routing: {
        send: { preSend: [import_GenericFunctions.memberPresend] },
        request: {
          method: "PUT",
          url: '=/member/{{$parameter["id"]}}'
        }
      }
    }
  ]
};
const commonFields = [
  {
    displayName: "Platform",
    name: "platform",
    description: "Platform for which to check member existence",
    type: "string",
    required: true,
    default: ""
  },
  {
    displayName: "Username",
    name: "username",
    description: "Username of the member in platform",
    type: "string",
    required: true,
    default: ""
  }
];
const additionalOptions = [
  {
    displayName: "Display Name",
    name: "displayName",
    description: "UI friendly name of the member",
    type: "string",
    default: ""
  },
  shared.emailsField,
  {
    displayName: "Joined At",
    name: "joinedAt",
    description: "Date of joining the community",
    type: "dateTime",
    default: ""
  },
  {
    displayName: "Organizations",
    name: "organizations",
    description: "Organizations associated with the member. Each element in the array is the name of the organization, or an organization object. If the organization does not exist, it will be created.",
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
            displayName: "Name",
            name: "name",
            description: "The name of the organization",
            type: "string",
            required: true,
            default: ""
          },
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
          }
        ]
      }
    ]
  },
  {
    displayName: "Tags",
    name: "tags",
    description: "Tags associated with the member. Each element in the array is the ID of the tag.",
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
            displayName: "Tag",
            name: "tag",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Tasks",
    name: "tasks",
    description: "Tasks associated with the member. Each element in the array is the ID of the task.",
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
            displayName: "Task",
            name: "task",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Notes",
    name: "notes",
    description: "Notes associated with the member. Each element in the array is the ID of the note.",
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
            displayName: "Note",
            name: "note",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Activities",
    name: "activities",
    description: "Activities associated with the member. Each element in the array is the ID of the activity.",
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
            displayName: "Activity",
            name: "activity",
            type: "string",
            default: ""
          }
        ]
      }
    ]
  }
];
const memberFields = [
  Object.assign((0, import_utils.getId)(), { description: "The ID of the member" }, displayFor.id),
  ...commonFields.map((0, import_utils.mapWith)(displayFor.createOrUpdate)),
  Object.assign({}, (0, import_utils.getAdditionalOptions)(additionalOptions), displayFor.createOrUpdate)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  memberFields,
  memberOperations
});
//# sourceMappingURL=memberFields.js.map