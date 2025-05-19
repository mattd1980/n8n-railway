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
        description: "Create an activity",
        action: "Create an activity"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete an activity",
        action: "Delete an activity"
      },
      {
        name: "Get",
        value: "get",
        description: "Get an activity",
        action: "Get an activity"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get many companies",
        action: "Get many activities"
      },
      {
        name: "Update",
        value: "update",
        description: "Update an activity",
        action: "Update an activity"
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
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Owner Name or ID",
    name: "owner",
    type: "options",
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    default: "",
    typeOptions: {
      loadOptionsMethod: "getUsers"
    },
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    },
    required: true
  },
  {
    displayName: "Type",
    name: "type",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    },
    description: "This field displays activity type such as call, meeting etc",
    required: true
  },
  {
    displayName: "RAW Data",
    name: "rawData",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    },
    default: false,
    description: "Whether the data should include the fields details"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "This field contains details related to the activity"
      },
      {
        displayName: "Tags",
        name: "tags",
        type: "string",
        default: "",
        description: "This field contains tags associated with an activity"
      },
      {
        displayName: "Due Date",
        name: "dueDate",
        type: "dateTime",
        default: "",
        description: "Expiry date of an activity"
      },
      {
        displayName: "Duration",
        name: "duration",
        type: "number",
        default: "",
        description: "Time duration of an activity"
      },
      {
        displayName: "Is Calendar Invite",
        name: "isCalendarInvite",
        type: "boolean",
        default: false,
        description: "Whether to send calendar invite"
      },
      {
        displayName: "Is Completed",
        name: "isCompleted",
        type: "boolean",
        default: false,
        description: "Whether the activity is completed or not"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                activity:update                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Activity ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "RAW Data",
    name: "rawData",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"]
      }
    },
    default: false,
    description: "Whether the data should include the fields details"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: ""
      },
      {
        displayName: "Type",
        name: "type",
        type: "string",
        default: ""
      },
      {
        displayName: "Owner",
        name: "owner",
        type: "string",
        default: ""
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "This field contains details related to the activity"
      },
      {
        displayName: "Tags",
        name: "tags",
        type: "string",
        default: "",
        description: "This field contains tags associated with an activity"
      },
      {
        displayName: "Due Date",
        name: "dueDate",
        type: "dateTime",
        default: "",
        description: "Expiry date of an activity"
      },
      {
        displayName: "Duration",
        name: "duration",
        type: "number",
        default: "",
        description: "Time duration of an activity"
      },
      {
        displayName: "Is Calendar Invite",
        name: "isCalendarInvite",
        type: "boolean",
        default: false,
        description: "Whether to send calendar invite"
      },
      {
        displayName: "Is Completed",
        name: "isCompleted",
        type: "boolean",
        default: false,
        description: "Whether the activity is completed or not"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                 activity:get                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Activity ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["get"]
      }
    }
  },
  {
    displayName: "RAW Data",
    name: "rawData",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["get"]
      }
    },
    default: false,
    description: "Whether the data should include the fields details"
  },
  /* -------------------------------------------------------------------------- */
  /*                                 activity:getAll                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["activity"],
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
        resource: ["activity"],
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 25
    },
    default: 10,
    description: "Max number of results to return"
  },
  {
    displayName: "JSON Parameters",
    name: "jsonParameters",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["activity"]
      }
    }
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    default: {},
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Fields",
        name: "fields",
        type: "string",
        default: "",
        description: "Comma-separated list of fields to return"
      },
      {
        displayName: "Sort By",
        name: "sortBy",
        type: "string",
        default: "",
        description: "The field to sort by"
      },
      {
        displayName: "Sort Order",
        name: "sortOrder",
        type: "options",
        options: [
          {
            name: "ASC",
            value: "asc"
          },
          {
            name: "DESC",
            value: "desc"
          }
        ],
        default: "desc"
      }
    ]
  },
  {
    displayName: "Filters",
    name: "filtersJson",
    type: "json",
    typeOptions: {
      alwaysOpenEditWindow: true
    },
    default: "",
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["activity"],
        jsonParameters: [true]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    placeholder: "Add filter",
    type: "fixedCollection",
    typeOptions: {
      multipleValues: false
    },
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["getAll"],
        jsonParameters: [false]
      }
    },
    default: {},
    options: [
      {
        name: "filtersUi",
        displayName: "Filters",
        values: [
          {
            displayName: "Operator",
            name: "operator",
            type: "options",
            options: [
              {
                name: "AND",
                value: "AND"
              },
              {
                name: "OR",
                value: "OR"
              }
            ],
            default: "AND"
          },
          {
            displayName: "Conditions",
            name: "conditions",
            placeholder: "Add Condition",
            type: "fixedCollection",
            typeOptions: {
              multipleValues: true
            },
            default: {},
            options: [
              {
                name: "conditionsUi",
                displayName: "Conditions",
                values: [
                  {
                    displayName: "Field",
                    name: "field",
                    type: "options",
                    options: [
                      {
                        name: "Title",
                        value: "title"
                      },
                      {
                        name: "Tags",
                        value: "tags"
                      }
                    ],
                    default: "title"
                  },
                  {
                    displayName: "Condition",
                    name: "condition",
                    type: "options",
                    // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
                    options: [
                      {
                        name: "Equals",
                        value: "EQUALS"
                      },
                      {
                        name: "Not Equals",
                        value: "NOT_EQUALS"
                      },
                      {
                        name: "CONTAINS",
                        value: "Contains"
                      },
                      {
                        name: "Does Not Contains",
                        value: "DOES_NOT_CONTAINS"
                      },
                      {
                        name: "Empty",
                        value: "EMPTY"
                      },
                      {
                        name: "Not Empty",
                        value: "NOT_EMPTY"
                      },
                      {
                        name: "Starts With",
                        value: "STARTS_WITH"
                      },
                      {
                        name: "Ends With",
                        value: "ENDS_WITH"
                      }
                    ],
                    default: "EQUALS",
                    description: "Value of the property to set"
                  },
                  {
                    displayName: "Value",
                    name: "value",
                    type: "string",
                    default: ""
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                activity:delete                             */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Activity ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["delete"]
      }
    },
    description: "If more than one activity add them separated by ,"
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activityFields,
  activityOperations
});
//# sourceMappingURL=ActivityDescription.js.map