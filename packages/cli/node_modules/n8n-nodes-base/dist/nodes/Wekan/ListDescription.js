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
var ListDescription_exports = {};
__export(ListDescription_exports, {
  listFields: () => listFields,
  listOperations: () => listOperations
});
module.exports = __toCommonJS(ListDescription_exports);
const listOperations = [
  // ----------------------------------
  //         list
  // ----------------------------------
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["list"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new list",
        action: "Create a list"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a list",
        action: "Delete a list"
      },
      {
        name: "Get",
        value: "get",
        description: "Get the data of a list",
        action: "Get a list"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many board lists",
        action: "Get many lists"
      }
    ],
    default: "create"
  }
];
const listFields = [
  // ----------------------------------
  //         list:create
  // ----------------------------------
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["list"]
      }
    },
    description: 'The ID of the board the list should be created in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    placeholder: "My list",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["list"]
      }
    },
    description: "The title of the list"
  },
  // ----------------------------------
  //         list:delete
  // ----------------------------------
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["list"]
      }
    },
    description: 'The ID of the board that list belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "List Name or ID",
    name: "listId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getLists",
      loadOptionsDependsOn: ["boardId"]
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["list"]
      }
    },
    description: 'The ID of the list to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  // ----------------------------------
  //         list:get
  // ----------------------------------
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["list"]
      }
    },
    description: 'The ID of the board that list belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "List ID",
    name: "listId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["list"]
      }
    },
    description: "The ID of the list to get"
  },
  // ----------------------------------
  //         list:getAll
  // ----------------------------------
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["list"]
      }
    },
    description: 'ID of the board where the lists are in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["list"]
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
        resource: ["list"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 200
    },
    default: 100,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listFields,
  listOperations
});
//# sourceMappingURL=ListDescription.js.map