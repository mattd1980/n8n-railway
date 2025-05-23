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
var activityFields_exports = {};
__export(activityFields_exports, {
  activityFields: () => activityFields,
  activityOperations: () => activityOperations
});
module.exports = __toCommonJS(activityFields_exports);
var import_shared = require("./shared");
var import_utils = require("./utils");
var import_GenericFunctions = require("../GenericFunctions");
const displayOpts = (0, import_utils.showFor)(["activity"]);
const displayFor = {
  resource: displayOpts(),
  createWithMember: displayOpts(["createWithMember"]),
  createForMember: displayOpts(["createForMember"])
};
const activityOperations = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  displayOptions: displayFor.resource.displayOptions,
  noDataExpression: true,
  default: "createWithMember",
  options: [
    {
      name: "Create or Update with a Member",
      value: "createWithMember",
      description: "Create or update an activity with a member",
      action: "Create or update an activity with a member",
      routing: {
        send: { preSend: [import_GenericFunctions.activityPresend] },
        request: {
          method: "POST",
          url: "/activity/with-member"
        }
      }
    },
    {
      name: "Create",
      value: "createForMember",
      description: "Create an activity for a member",
      action: "Create an activity for a member",
      routing: {
        send: { preSend: [import_GenericFunctions.activityPresend] },
        request: {
          method: "POST",
          url: "/activity"
        }
      }
    }
  ]
};
const createWithMemberFields = [
  {
    displayName: "Username",
    name: "username",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: true
    },
    required: true,
    default: {},
    options: [
      {
        displayName: "Item Choice",
        name: "itemChoice",
        values: [
          {
            displayName: "Platform",
            description: "Platform name (e.g twitter, github, etc)",
            name: "key",
            type: "string",
            required: true,
            default: ""
          },
          {
            displayName: "Username",
            description: "Username at the specified Platform",
            name: "value",
            type: "string",
            required: true,
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "displayName",
    name: "displayName",
    description: "UI friendly name of the member",
    type: "string",
    default: ""
  },
  import_shared.emailsField,
  {
    displayName: "Joined At",
    name: "joinedAt",
    description: "Date of joining the community",
    type: "dateTime",
    default: ""
  }
];
const memberIdField = {
  displayName: "Member",
  name: "member",
  description: "The ID of the member that performed the activity",
  type: "string",
  required: true,
  default: ""
};
const createCommonFields = [
  {
    displayName: "Type",
    name: "type",
    description: "Type of activity",
    type: "string",
    required: true,
    default: ""
  },
  {
    displayName: "Timestamp",
    name: "timestamp",
    description: "Date and time when the activity took place",
    type: "dateTime",
    required: true,
    default: ""
  },
  {
    displayName: "Platform",
    name: "platform",
    description: "Platform on which the activity took place",
    type: "string",
    required: true,
    default: ""
  },
  {
    displayName: "Source ID",
    name: "sourceId",
    description: "The ID of the activity in the platform (e.g. the ID of the message in Discord)",
    type: "string",
    required: true,
    default: ""
  }
];
const additionalOptions = [
  {
    displayName: "Title",
    name: "title",
    description: "Title of the activity",
    type: "string",
    default: ""
  },
  {
    displayName: "Body",
    name: "body",
    description: "Body of the activity",
    type: "string",
    default: ""
  },
  {
    displayName: "Channel",
    name: "channel",
    description: "Channel of the activity",
    type: "string",
    default: ""
  },
  {
    displayName: "Source Parent ID",
    name: "sourceParentId",
    description: "The ID of the parent activity in the platform (e.g. the ID of the parent message in Discord)",
    type: "string",
    default: ""
  }
];
const activityFields = [
  ...createWithMemberFields.map((0, import_utils.mapWith)(displayFor.createWithMember)),
  Object.assign({}, memberIdField, displayFor.createForMember),
  ...createCommonFields.map((0, import_utils.mapWith)(displayFor.resource)),
  Object.assign({}, (0, import_utils.getAdditionalOptions)(additionalOptions), displayFor.resource)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activityFields,
  activityOperations
});
//# sourceMappingURL=activityFields.js.map