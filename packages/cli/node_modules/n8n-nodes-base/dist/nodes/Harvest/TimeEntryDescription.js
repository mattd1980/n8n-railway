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
var TimeEntryDescription_exports = {};
__export(TimeEntryDescription_exports, {
  resource: () => resource,
  timeEntryFields: () => timeEntryFields,
  timeEntryOperations: () => timeEntryOperations
});
module.exports = __toCommonJS(TimeEntryDescription_exports);
const resource = ["timeEntry"];
const timeEntryOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource
      }
    },
    options: [
      {
        name: "Create via Duration",
        value: "createByDuration",
        description: "Create a time entry via duration",
        action: "Create a time entry via duration"
      },
      {
        name: "Create via Start and End Time",
        value: "createByStartEnd",
        description: "Create a time entry via start and end time",
        action: "Create a time entry via start and end time"
      },
      {
        name: "Delete",
        value: "delete",
        description: "Delete a time entry",
        action: "Delete a time entry"
      },
      {
        name: "Delete External Reference",
        value: "deleteExternal",
        description: "Delete a time entry\u2019s external reference",
        action: "Delete a time entry\u2019s external reference"
      },
      {
        name: "Get",
        value: "get",
        description: "Get data of a time entry",
        action: "Get data of a time entry"
      },
      {
        name: "Get Many",
        value: "getAll",
        description: "Get data of many time entries",
        action: "Get data of all time entries"
      },
      {
        name: "Restart",
        value: "restartTime",
        description: "Restart a time entry",
        action: "Restart a time entry"
      },
      {
        name: "Stop",
        value: "stopTime",
        description: "Stop a time entry",
        action: "Stop a time entry"
      },
      {
        name: "Update",
        value: "update",
        description: "Update a time entry",
        action: "Update a time entry"
      }
    ],
    default: "getAll"
  }
];
const timeEntryFields = [
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:getAll                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    displayOptions: {
      show: {
        resource,
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
        resource,
        operation: ["getAll"],
        returnAll: [false]
      }
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    default: 100,
    description: "Max number of results to return"
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource,
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Client ID",
        name: "client_id",
        type: "string",
        default: "",
        description: "Only return time entries belonging to the client with the given ID"
      },
      {
        displayName: "From",
        name: "from",
        type: "dateTime",
        default: "",
        description: "Only return time entries with a spent_date on or after the given date"
      },
      {
        displayName: "Is Billed",
        name: "is_billed",
        type: "boolean",
        default: true,
        description: "Whether to only return time entries that have been invoiced and false to return time entries that have not been invoiced"
      },
      {
        displayName: "Is Running",
        name: "is_running",
        type: "boolean",
        default: true,
        description: "Whether to only return running time entries and false to return non-running time entries"
      },
      {
        displayName: "Page",
        name: "page",
        type: "number",
        typeOptions: {
          minValue: 1
        },
        default: 1,
        description: "The page number to use in pagination. For instance, if you make a list request and receive 100 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)"
      },
      {
        displayName: "To",
        name: "to",
        type: "dateTime",
        default: "",
        description: "Only return time entries with a spent_date on or before the given date"
      },
      {
        displayName: "Updated Since",
        name: "updated_since",
        type: "dateTime",
        default: "",
        description: "Only return time entries that have been updated since the given date and time"
      },
      {
        displayName: "User ID",
        name: "user_id",
        type: "string",
        default: "",
        description: "Only return time entries belonging to the user with the given ID"
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:get                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Time Entry ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["get"],
        resource
      }
    },
    description: "The ID of the time entry you are retrieving"
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:delete                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Time Entry ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
        resource
      }
    },
    description: "The ID of the time entry you are deleting"
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:deleteExternal                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Time Entry ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["deleteExternal"],
        resource
      }
    },
    description: "The ID of the time entry whose external reference you are deleting"
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:stopTime                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Time Entry ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["stopTime"],
        resource
      }
    },
    description: "Stop a running time entry. Stopping a time entry is only possible if it\u2019s currently running."
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:restartTime                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Time Entry ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["restartTime"],
        resource
      }
    },
    description: "Restart a stopped time entry. Restarting a time entry is only possible if it isn\u2019t currently running."
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:update                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Time Entry ID",
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["update"],
        resource
      }
    },
    description: "The ID of the time entry to update"
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["update"],
        resource
      }
    },
    default: {},
    options: [
      {
        displayName: "Ended Time",
        name: "ended_time",
        type: "string",
        default: "",
        placeholder: "3:00pm",
        description: "The time the entry ended"
      },
      {
        displayName: "Hours",
        name: "hours",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0,
        description: "The current amount of time tracked"
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: "",
        description: "These are notes about the time entry"
      },
      {
        displayName: "Started Time",
        name: "started_time",
        type: "string",
        default: "",
        placeholder: "3:00pm",
        description: "The time the entry started. Defaults to the current time. Example: \u201C8:00am\u201D."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:createByDuration                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Project ID",
    name: "projectId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["createByDuration"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The ID of the project to associate with the time entry"
  },
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["createByDuration"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The ID of the task to associate with the time entry"
  },
  {
    displayName: "Spent Date",
    name: "spentDate",
    type: "dateTime",
    displayOptions: {
      show: {
        operation: ["createByDuration"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The ISO 8601 formatted date the time entry was spent"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["createByDuration"],
        resource
      }
    },
    default: {},
    options: [
      {
        displayName: "Hours",
        name: "hours",
        type: "number",
        typeOptions: {
          minValue: 0
        },
        default: 0,
        description: "The current amount of time tracked"
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: "",
        description: "These are notes about the time entry"
      },
      {
        displayName: "User ID",
        name: "user_id",
        type: "string",
        default: "",
        description: "The ID of the user to associate with the time entry. Defaults to the currently authenticated user\u2019s ID."
      }
    ]
  },
  /* -------------------------------------------------------------------------- */
  /*                                timeEntry:createByStartEnd                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Project ID",
    name: "projectId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["createByStartEnd"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The ID of the project to associate with the time entry"
  },
  {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    displayOptions: {
      show: {
        operation: ["createByStartEnd"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The ID of the task to associate with the time entry"
  },
  {
    displayName: "Spent Date",
    name: "spentDate",
    type: "dateTime",
    displayOptions: {
      show: {
        operation: ["createByStartEnd"],
        resource
      }
    },
    default: "",
    required: true,
    description: "The ISO 8601 formatted date the time entry was spent"
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        operation: ["createByStartEnd"],
        resource
      }
    },
    default: {},
    options: [
      {
        displayName: "Ended Time",
        name: "ended_time",
        type: "string",
        default: "",
        placeholder: "3:00pm",
        description: "The time the entry ended"
      },
      {
        displayName: "Notes",
        name: "notes",
        type: "string",
        default: "",
        description: "These are notes about the time entry"
      },
      {
        displayName: "Started Time",
        name: "started_time",
        type: "string",
        default: "",
        placeholder: "8:00am",
        description: "The time the entry started. Defaults to the current time. Example: \u201C8:00am\u201D."
      },
      {
        displayName: "User ID",
        name: "user_id",
        type: "string",
        default: "",
        description: "The ID of the user to associate with the time entry. Defaults to the currently authenticated user\u2019s ID."
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resource,
  timeEntryFields,
  timeEntryOperations
});
//# sourceMappingURL=TimeEntryDescription.js.map