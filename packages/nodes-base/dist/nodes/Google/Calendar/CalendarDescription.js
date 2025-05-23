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
var CalendarDescription_exports = {};
__export(CalendarDescription_exports, {
  calendarFields: () => calendarFields,
  calendarOperations: () => calendarOperations
});
module.exports = __toCommonJS(CalendarDescription_exports);
var import_GenericFunctions = require("./GenericFunctions");
const calendarOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["calendar"]
      }
    },
    options: [
      {
        name: "Availability",
        value: "availability",
        description: "If a time-slot is available in a calendar",
        action: "Get availability in a calendar"
      }
    ],
    default: "availability"
  }
];
const calendarFields = [
  /* -------------------------------------------------------------------------- */
  /*                                 calendar:availability                      */
  /* -------------------------------------------------------------------------- */
  {
    displayName: "Calendar",
    name: "calendar",
    type: "resourceLocator",
    default: { mode: "list", value: "" },
    required: true,
    description: "Google Calendar to operate on",
    modes: [
      {
        displayName: "Calendar",
        name: "list",
        type: "list",
        placeholder: "Select a Calendar...",
        typeOptions: {
          searchListMethod: "getCalendars",
          searchable: true
        }
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        validation: [
          {
            type: "regex",
            properties: {
              // calendar ids are emails. W3C email regex with optional trailing whitespace.
              regex: "(^[a-zA-Z0-9.!#$%&\u2019*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*(?:[ 	]+)*$)",
              errorMessage: "Not a valid Google Calendar ID"
            }
          }
        ],
        extractValue: {
          type: "regex",
          regex: "(^[a-zA-Z0-9.!#$%&\u2019*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)"
        },
        placeholder: "name@google.com"
      }
    ],
    displayOptions: {
      show: {
        resource: ["calendar"]
      }
    }
  },
  {
    displayName: "Start Time",
    name: "timeMin",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        operation: ["availability"],
        resource: ["calendar"],
        "@version": [{ _cnd: { lt: 1.3 } }]
      }
    },
    default: "",
    description: "Start of the interval"
  },
  {
    displayName: "End Time",
    name: "timeMax",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        operation: ["availability"],
        resource: ["calendar"],
        "@version": [{ _cnd: { lt: 1.3 } }]
      }
    },
    default: "",
    description: "End of the interval"
  },
  {
    displayName: "Start Time",
    name: "timeMin",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        operation: ["availability"],
        resource: ["calendar"],
        "@version": [{ _cnd: { gte: 1.3 } }]
      }
    },
    default: "={{ $now }}",
    description: 'Start of the interval, use <a href="https://docs.n8n.io/code/cookbook/luxon/" target="_blank">expression</a> to set a date, or switch to fixed mode to choose date from widget'
  },
  {
    displayName: "End Time",
    name: "timeMax",
    type: "dateTime",
    required: true,
    displayOptions: {
      show: {
        operation: ["availability"],
        resource: ["calendar"],
        "@version": [{ _cnd: { gte: 1.3 } }]
      }
    },
    default: "={{ $now.plus(1, 'hour') }}",
    description: 'End of the interval, use <a href="https://docs.n8n.io/code/cookbook/luxon/" target="_blank">expression</a> to set a date, or switch to fixed mode to choose date from widget'
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add option",
    displayOptions: {
      show: {
        operation: ["availability"],
        resource: ["calendar"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Output Format",
        name: "outputFormat",
        type: "options",
        options: [
          {
            name: "Availability",
            value: "availability",
            description: "Returns if there are any events in the given time or not"
          },
          {
            name: "Booked Slots",
            value: "bookedSlots",
            description: "Returns the booked slots"
          },
          {
            name: "RAW",
            value: "raw",
            description: "Returns the RAW data from the API"
          }
        ],
        default: "availability",
        description: "The format to return the data in"
      },
      {
        displayName: "Timezone",
        name: "timezone",
        type: "resourceLocator",
        default: { mode: "list", value: "" },
        description: "Time zone used in the response. By default n8n timezone is used.",
        modes: [
          {
            displayName: "Timezone",
            name: "list",
            type: "list",
            placeholder: "Select a Timezone...",
            typeOptions: {
              searchListMethod: "getTimezones",
              searchable: true
            }
          },
          {
            displayName: "ID",
            name: "id",
            type: "string",
            validation: [
              {
                type: "regex",
                properties: {
                  regex: import_GenericFunctions.TIMEZONE_VALIDATION_REGEX,
                  errorMessage: "Not a valid Timezone"
                }
              }
            ],
            extractValue: {
              type: "regex",
              regex: "([-+/_a-zA-Z0-9]*)"
            },
            placeholder: "Europe/Berlin"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calendarFields,
  calendarOperations
});
//# sourceMappingURL=CalendarDescription.js.map