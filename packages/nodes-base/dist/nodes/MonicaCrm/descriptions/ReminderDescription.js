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
var ReminderDescription_exports = {};
__export(ReminderDescription_exports, {
  reminderFields: () => reminderFields,
  reminderOperations: () => reminderOperations
});
module.exports = __toCommonJS(ReminderDescription_exports);
const reminderOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["reminder"]
      }
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a reminder",
        action: "Create a reminder"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a reminder",
        action: "Delete a reminder"
      },
      {
        name: "Get",
        value: "get",
        description: "Retrieve a reminder",
        action: "Get a reminder"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Retrieve many reminders",
        action: "Get many reminders"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a reminder",
        action: "Update a reminder"
      }
    ],
    default: "create"
  }
];
const reminderFields = [
  // ----------------------------------------
  //             reminder: create
  // ----------------------------------------
  {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    default: "",
    description: "ID of the contact to associate the reminder with",
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Frequency Type",
    name: "frequencyType",
    description: "Type of frequency of the reminder",
    type: "options",
    required: true,
    default: "one_time",
    options: [
      {
        name: "Once",
        value: "one_time"
      },
      {
        name: "Weekly",
        value: "week"
      },
      {
        name: "Monthly",
        value: "month"
      },
      {
        name: "Yearly",
        value: "year"
      }
    ],
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Recurring Interval",
    name: "frequencyNumber",
    type: "number",
    default: 0,
    description: "Interval for the reminder",
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["create"],
        frequencyType: ["week", "month", "year"]
      }
    }
  },
  {
    displayName: "Initial Date",
    name: "initialDate",
    description: "Date of the reminder",
    type: "dateTime",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Title",
    name: "title",
    description: "Title of the reminder - max 100,000 characters",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reminder"],
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
        resource: ["reminder"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "Description about the reminder - Max 100,000 characters"
      }
    ]
  },
  // ----------------------------------------
  //             reminder: delete
  // ----------------------------------------
  {
    displayName: "Reminder ID",
    name: "reminderId",
    description: "ID of the reminder to delete",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["delete"]
      }
    }
  },
  // ----------------------------------------
  //              reminder: get
  // ----------------------------------------
  {
    displayName: "Reminder ID",
    name: "reminderId",
    description: "ID of the reminder to retrieve",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------------
  //             reminder: getAll
  // ----------------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1
    },
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  // ----------------------------------------
  //             reminder: update
  // ----------------------------------------
  {
    displayName: "Reminder ID",
    name: "reminderId",
    description: "ID of the reminder to update",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["reminder"],
        operation: ["update"]
      }
    },
    options: [
      {
        displayName: "Contact ID",
        name: "contact_id",
        type: "string",
        default: "",
        description: "ID of the contact to associate the reminder with"
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "Description about the reminder - Max 100,000 characters"
      },
      {
        displayName: "Frequency Type",
        name: "frequency_type",
        description: "Frequency of the reminder",
        type: "options",
        default: "one_time",
        options: [
          {
            name: "One Time",
            value: "one_time"
          },
          {
            name: "Week",
            value: "week"
          },
          {
            name: "Month",
            value: "month"
          },
          {
            name: "Year",
            value: "year"
          }
        ]
      },
      {
        displayName: "Initial Date",
        name: "initial_data",
        description: "Date of the reminder",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Recurring Interval",
        name: "frequency_number",
        type: "number",
        default: 0,
        description: "Interval for the reminder",
        displayOptions: {
          show: {
            frequency_type: ["week", "month", "year"]
          }
        }
      },
      {
        displayName: "Title",
        name: "title",
        description: "Title of the reminder - max 100,000 characters",
        type: "string",
        default: ""
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reminderFields,
  reminderOperations
});
//# sourceMappingURL=ReminderDescription.js.map