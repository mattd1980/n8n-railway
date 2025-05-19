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
var GoalKeyResultDescription_exports = {};
__export(GoalKeyResultDescription_exports, {
  goalKeyResultFields: () => goalKeyResultFields,
  goalKeyResultOperations: () => goalKeyResultOperations
});
module.exports = __toCommonJS(GoalKeyResultDescription_exports);
const goalKeyResultOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["goalKeyResult"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a key result",
        action: "Create a goal key result"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a key result",
        action: "Delete a goal key result"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a key result",
        action: "Update a goal key result"
      }
    ],
    default: "create"
  }
];
const goalKeyResultFields = [
  /* -------------------------------------------------------------------------- */
  /*                                goalKeyResult:create                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Goal ID",
    name: "goal",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["goalKeyResult"],
        operation: ["create"]
      }
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
        resource: ["goalKeyResult"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Type",
    name: "type",
    type: "options",
    options: [
      {
        name: "Automatic",
        value: "automatic"
      },
      {
        name: "Boolean",
        value: "boolean"
      },
      {
        name: "Currency",
        value: "currency"
      },
      {
        name: "Number",
        value: "number"
      },
      {
        name: "Percentage",
        value: "percentage"
      }
    ],
    default: "",
    displayOptions: {
      show: {
        resource: ["goalKeyResult"],
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
        resource: ["goalKeyResult"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "List IDs",
        name: "listIds",
        type: "string",
        default: ""
      },
      {
        displayName: "Owners",
        name: "owners",
        type: "string",
        default: ""
      },
      {
        displayName: "Steps Start",
        name: "stepsStart",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0,
        description: "Required for Percentage, Automatic, Number and Currency"
      },
      {
        displayName: "Steps End",
        name: "stepsEnd",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0,
        description: "Required for Percentage, Automatic, Number and Currency"
      },
      {
        displayName: "Task IDs",
        name: "taskIds",
        type: "string",
        default: ""
      },
      {
        displayName: "Unit",
        name: "unit",
        type: "string",
        default: "",
        description: "Only matters for type Number and Currency. For Currency the unit must be a valid currency code."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                goalKeyResult:delete                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Key Result ID",
    name: "keyResult",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["goalKeyResult"],
        operation: ["delete"]
      }
    },
    required: true
  },
  /* -------------------------------------------------------------------------- */
  /*                                goalKeyResult:update                        */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Key Result ID",
    name: "keyResult",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["goalKeyResult"],
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
        resource: ["goalKeyResult"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Note",
        name: "note",
        type: "string",
        default: ""
      },
      {
        displayName: "Steps Current",
        name: "stepsCurrent",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 1
      },
      {
        displayName: "Steps End",
        name: "stepsEnd",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      },
      {
        displayName: "Steps Start",
        name: "stepsStart",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0
      },
      {
        displayName: "Unit",
        name: "unit",
        type: "string",
        default: "",
        description: "Only matters for type Number and Currency. For Currency the unit must be a valid currency code."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  goalKeyResultFields,
  goalKeyResultOperations
});
//# sourceMappingURL=GoalKeyResultDescription.js.map