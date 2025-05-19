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
var CommentDescription_exports = {};
__export(CommentDescription_exports, {
  commentFields: () => commentFields,
  commentOperations: () => commentOperations
});
module.exports = __toCommonJS(CommentDescription_exports);
const commentOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["comment"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a comment",
        action: "Create a comment"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a comment",
        action: "Delete a comment"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many comments",
        action: "Get many comments"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a comment",
        action: "Update a comment"
      }
    ],
    default: "create"
  }
];
const commentFields = [
  /* -------------------------------------------------------------------------- */
  /*                                comment:create                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Comment On",
    name: "commentOn",
    type: "options",
    options: [
      {
        name: "List",
        value: "list"
      },
      {
        name: "Task",
        value: "task"
      },
      {
        name: "View",
        value: "view"
      }
    ],
    default: "",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "ID",
    name: "id",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Comment Text",
    name: "commentText",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Assignee ID",
        name: "assignee",
        type: "string",
        default: ""
      },
      {
        displayName: "Notify All",
        name: "notifyAll",
        type: "boolean",
        default: false,
        description: "Whether creation notifications will be sent to everyone including the creator of the comment"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                comment:delete                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Comment ID",
    name: "comment",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["delete"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                comment:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Comments On",
    name: "commentsOn",
    type: "options",
    options: [
      {
        name: "List",
        value: "list"
      },
      {
        name: "Task",
        value: "task"
      },
      {
        name: "View",
        value: "view"
      }
    ],
    default: "",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "ID",
    name: "id",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["getAll"]
      }
    },
    required: true
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["getAll"]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  },
  /* -------------------------------------------------------------------------- */
  /*                                comment:update                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Comment ID",
    name: "comment",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["update"]
      }
    },
    required: true
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["comment"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Assignee ID",
        name: "assignee",
        type: "string",
        default: ""
      },
      {
        displayName: "Comment Text",
        name: "commentText",
        type: "string",
        default: ""
      },
      {
        displayName: "Resolved",
        name: "resolved",
        type: "boolean",
        default: false
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  commentFields,
  commentOperations
});
//# sourceMappingURL=CommentDescription.js.map