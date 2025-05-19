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
var ChecklistDescription_exports = {};
__export(ChecklistDescription_exports, {
  checklistFields: () => checklistFields,
  checklistOperations: () => checklistOperations
});
module.exports = __toCommonJS(ChecklistDescription_exports);
const checklistOperations = [
  // ----------------------------------
  //         checklist
  // ----------------------------------
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["checklist"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new checklist",
        action: "Create a checklist"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a checklist",
        action: "Delete a checklist"
      },
      {
        name: "Get",
        value: "get",
        description: "Get the data of a checklist",
        action: "Get a checklist"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Returns many checklists for the card",
        action: "Get many checklists"
      }
    ],
    default: "getAll"
  }
];
const checklistFields = [
  // ----------------------------------
  //         checklist:create
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
        resource: ["checklist"]
      }
    },
    description: 'The ID of the board where the card is in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
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
        operation: ["create"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the list that card belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Card Name or ID",
    name: "cardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getCards",
      loadOptionsDependsOn: ["boardId", "listId"]
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the card to add checklist to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["checklist"]
      }
    },
    description: "The title of the checklist to add"
  },
  {
    displayName: "Items",
    name: "items",
    type: "string",
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: "Add Item"
    },
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["checklist"]
      }
    },
    default: [],
    description: "Items to be added to the checklist"
  },
  // ----------------------------------
  //         checklist:delete
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
        resource: ["checklist"]
      }
    },
    description: 'The ID of the board that card belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
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
        resource: ["checklist"]
      }
    },
    description: 'The ID of the list that card belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Card Name or ID",
    name: "cardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getCards",
      loadOptionsDependsOn: ["boardId", "listId"]
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the card that checklist belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Checklist Name or ID",
    name: "checklistId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getChecklists",
      loadOptionsDependsOn: ["boardId", "cardId"]
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the checklist to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  // ----------------------------------
  //         checklist:get
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
        resource: ["checklist"]
      }
    },
    description: 'The ID of the board that card belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
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
        operation: ["get"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the list that card belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Card Name or ID",
    name: "cardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getCards",
      loadOptionsDependsOn: ["boardId", "listId"]
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the card that checklist belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Checklist Name or ID",
    name: "checklistId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getChecklists",
      loadOptionsDependsOn: ["boardId", "cardId"]
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the checklist to get. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  // ----------------------------------
  //         checklist:getAll
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
        resource: ["checklist"]
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
        operation: ["getAll"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the list that card belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Card Name or ID",
    name: "cardId",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getCards",
      loadOptionsDependsOn: ["boardId", "listId"]
    },
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["checklist"]
      }
    },
    description: 'The ID of the card to get checklists. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["checklist"]
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
        resource: ["checklist"],
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
  checklistFields,
  checklistOperations
});
//# sourceMappingURL=ChecklistDescription.js.map