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
var ActivityDescription_exports = {};
__export(ActivityDescription_exports, {
  activityFields: () => activityFields,
  activityOperations: () => activityOperations
});
module.exports = __toCommonJS(ActivityDescription_exports);
const activityOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["activity"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create an activity for a member",
        action: "Create an activity"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many activities",
        action: "Get many activities"
      }
    ],
    default: "create"
  }
];
const activityFields = [
  /* -------------------------------------------------------------------------- */
  /*                                activity:create                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Workspace Name or ID",
    name: "workspaceId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getWorkspaces"
    },
    default: "Deprecated",
    required: true,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Member ID",
    name: "memberId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Activity Type Name or ID",
        name: "activityType",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getActivityTypes"
        },
        default: "Deprecated",
        description: 'A user-defined way to group activities of the same nature. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "A description of the activity; displayed in the timeline"
      },
      {
        displayName: "Key",
        name: "key",
        type: "string",
        default: "",
        description: "Supply a key that must be unique or leave blank to have one generated"
      },
      {
        displayName: "Link",
        name: "link",
        type: "string",
        default: "",
        description: "A URL for the activity; displayed in the timeline"
      },
      {
        displayName: "Link Text",
        name: "linkText",
        type: "string",
        default: "",
        description: "The text for the timeline link"
      },
      {
        displayName: "Occurred At",
        name: "occurredAt",
        type: "dateTime",
        default: "",
        description: "The date and time the activity occurred; defaults to now"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                activity:getAll                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Workspace Name or ID",
    name: "workspaceId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getWorkspaces"
    },
    default: "Deprecated",
    required: true,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["activity"]
      }
    },
    default: false,
    description: "Whether to return all results or only up to a given limit"
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["activity"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Member ID",
        name: "memberId",
        type: "string",
        default: "",
        description: "When set the post will be filtered by the member ID"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activityFields,
  activityOperations
});
//# sourceMappingURL=ActivityDescription.js.map