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
var BoardGroupDescription_exports = {};
__export(BoardGroupDescription_exports, {
  boardGroupFields: () => boardGroupFields,
  boardGroupOperations: () => boardGroupOperations
});
module.exports = __toCommonJS(BoardGroupDescription_exports);
const boardGroupOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["boardGroup"]
      }
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        description: "Delete a group in a board",
        action: "Delete a board group"
      },
      {
        name: "Create",
        value: "create",
        description: "Create a group in a board",
        action: "Create a board group"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get list of groups in a board",
        action: "Get many board groups"
      }
    ],
    default: "create"
  }
];
const boardGroupFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 boardGroup:create                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["boardGroup"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["boardGroup"]
      }
    },
    default: "",
    description: "The group name"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 boardGroup:delete                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["boardGroup"],
        operation: ["delete"]
      }
    }
  },
  {
    displayName: "Group Name or ID",
    name: "groupId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    typeOptions: {
      loadOptionsMethod: "getGroups",
      loadOptionsDependsOn: ["boardId"]
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["boardGroup"],
        operation: ["delete"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                 boardGroup:getAll                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["boardGroup"],
        operation: ["getAll"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  boardGroupFields,
  boardGroupOperations
});
//# sourceMappingURL=BoardGroupDescription.js.map