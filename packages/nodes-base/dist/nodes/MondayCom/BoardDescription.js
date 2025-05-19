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
var BoardDescription_exports = {};
__export(BoardDescription_exports, {
  boardFields: () => boardFields,
  boardOperations: () => boardOperations
});
module.exports = __toCommonJS(BoardDescription_exports);
const boardOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["board"]
      }
    },
    options: [
      {
        name: "Archive",
        value: "archive",
        description: "Archive a board",
        action: "Archive a board"
      },
      {
        name: "Create",
        value: "create",
        description: "Create a new board",
        action: "Create a board"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a board",
        action: "Get a board"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many boards",
        action: "Get many boards"
      }
    ],
    default: "create"
  }
];
const boardFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 board:archive                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["board"],
        operation: ["archive"]
      }
    },
    description: 'Board unique identifiers. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  /* -------------------------------------------------------------------------- */
  /*                                 board:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["board"]
      }
    },
    default: "",
    description: "The board's name"
  },
  {
    displayName: "Kind",
    name: "kind",
    type: "options",
    options: [
      {
        name: "Share",
        value: "share"
      },
      {
        name: "Public",
        value: "public"
      },
      {
        name: "Private",
        value: "private"
      }
    ],
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["board"]
      }
    },
    default: "",
    description: "The board's kind (public / private / share)"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["board"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Template ID",
        name: "templateId",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0,
        description: "Optional board template ID"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                  board:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Board Name or ID",
    name: "boardId",
    type: "options",
    default: "",
    typeOptions: {
      loadOptionsMethod: "getBoards"
    },
    required: true,
    displayOptions: {
      show: {
        resource: ["board"],
        operation: ["get"]
      }
    },
    description: 'Board unique identifiers. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  /* -------------------------------------------------------------------------- */
  /*                                  board:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["board"],
        operation: ["getAll"]
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
        resource: ["board"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 50,
    description: "Max number of results to return"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  boardFields,
  boardOperations
});
//# sourceMappingURL=BoardDescription.js.map