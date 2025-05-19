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
var OpportunityDescription_exports = {};
__export(OpportunityDescription_exports, {
  opportunityDescription: () => opportunityDescription,
  opportunityOperations: () => opportunityOperations
});
module.exports = __toCommonJS(OpportunityDescription_exports);
const opportunityOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    default: "create",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["opportunity"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new opportunity",
        action: "Create an opportunity"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an opportunity",
        action: "Delete an opportunity"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an opportunity",
        action: "Get an opportunity"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many opportunities",
        action: "Get many opportunities"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an opportunity",
        action: "Update an opportunity"
      }
    ]
  }
];
const opportunityDescription = [
  /* -------------------------------------------------------------------------- */
  /*                                opportunity:create                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Name",
    name: "opportunityName",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["opportunity"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["create"],
        resource: ["opportunity"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email_from",
        type: "string",
        default: ""
      },
      // {
      // 	displayName: 'Expected Closing Date',
      // 	name: 'date_deadline',
      // 	type: 'dateTime',
      // 	default: '',
      // },
      {
        displayName: "Expected Revenue",
        name: "expected_revenue",
        type: "number",
        default: 0
      },
      {
        displayName: "Internal Notes",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: ""
      },
      {
        displayName: "Priority",
        name: "priority",
        type: "options",
        default: "1",
        options: [
          {
            name: "1",
            value: "1"
          },
          {
            name: "2",
            value: "2"
          },
          {
            name: "3",
            value: "3"
          }
        ]
      },
      {
        displayName: "Probability",
        name: "probability",
        type: "number",
        default: 0,
        typeOptions: {
          maxValue: 100,
          minValue: 0
        }
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                opportunity:get                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Opportunity ID",
    name: "opportunityId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get", "delete"],
        resource: ["opportunity"]
      }
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                                opportunity:getAll                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["opportunity"],
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
    default: 50,
    displayOptions: {
      show: {
        resource: ["opportunity"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1e3
    },
    description: "Max number of results to return"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["getAll", "get"],
        resource: ["opportunity"]
      }
    },
    options: [
      {
        displayName: "Fields to Include",
        name: "fieldsList",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: [],
        typeOptions: {
          loadOptionsMethod: "getModelFields"
        }
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                opportunity:update                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Opportunity ID",
    name: "opportunityId",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["opportunity"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    default: {},
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["opportunity"]
      }
    },
    options: [
      {
        displayName: "Email",
        name: "email_from",
        type: "string",
        default: ""
      },
      // {
      // 	displayName: 'Expected Closing Date',
      // 	name: 'date_deadline',
      // 	type: 'dateTime',
      // 	default: '',
      // },
      {
        displayName: "Expected Revenue",
        name: "expected_revenue",
        type: "number",
        default: 0
      },
      {
        displayName: "Internal Notes",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: ""
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        default: ""
      },
      {
        displayName: "Priority",
        name: "priority",
        type: "options",
        default: "1",
        options: [
          {
            name: "1",
            value: "1"
          },
          {
            name: "2",
            value: "2"
          },
          {
            name: "3",
            value: "3"
          }
        ]
      },
      {
        displayName: "Probability",
        name: "probability",
        type: "number",
        default: 0,
        typeOptions: {
          maxValue: 100,
          minValue: 0
        }
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  opportunityDescription,
  opportunityOperations
});
//# sourceMappingURL=OpportunityDescription.js.map