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
var GoalDescription_exports = {};
__export(GoalDescription_exports, {
  goalFields: () => goalFields,
  goalOperations: () => goalOperations
});
module.exports = __toCommonJS(GoalDescription_exports);
const goalOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["goal"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a goal",
        action: "Create a goal"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a goal",
        action: "Delete a goal"
      },
      {
        name: "Get",
        value: "get",
        description: "Get a goal",
        action: "Get a goal"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many goals",
        action: "Get many goals"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a goal",
        action: "Update a goal"
      }
    ],
    default: "create"
  }
];
const goalFields = [
  /* -------------------------------------------------------------------------- */
  /*                                goal:create                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["goal"],
        operation: ["create"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["goal"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["goal"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Color",
        name: "color",
        type: "color",
        default: ""
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Due Date",
        name: "dueDate",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Multiple Owners",
        name: "multipleOwners",
        type: "boolean",
        default: false
      },
      {
        displayName: "Owners",
        name: "owners",
        type: "string",
        default: ""
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                goal:delete                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Goal ID",
    name: "goal",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["goal"],
        operation: ["delete"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                goal:get                                    */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Goal ID",
    name: "goal",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["goal"],
        operation: ["get"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                goal:getAll                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Team Name or ID",
    name: "team",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    displayOptions: {
      show: {
        resource: ["goal"],
        operation: ["getAll"]
      }
    },
    typeOptions: {
      loadOptionsMethod: "getTeams"
    },
    required: true
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    displayOptions: {
      show: {
        resource: ["goal"],
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
  /*                                goal:update                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Goal ID",
    name: "goal",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["goal"],
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
        resource: ["goal"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Add Owners",
        name: "addOwners",
        type: "string",
        default: ""
      },
      {
        displayName: "Color",
        name: "color",
        type: "color",
        default: ""
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Due Date",
        name: "dueDate",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Remove Owners",
        name: "removeOwners",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  goalFields,
  goalOperations
});
//# sourceMappingURL=GoalDescription.js.map