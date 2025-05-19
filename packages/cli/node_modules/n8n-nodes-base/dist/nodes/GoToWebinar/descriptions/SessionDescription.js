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
var SessionDescription_exports = {};
__export(SessionDescription_exports, {
  sessionFields: () => sessionFields,
  sessionOperations: () => sessionOperations
});
module.exports = __toCommonJS(SessionDescription_exports);
const sessionOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get a session"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many sessions"
      },
      {
        name: "Get Details",
        value: "getDetails",
        action: "Get details on a session"
      }
    ],
    displayOptions: {
      show: {
        resource: ["session"]
      }
    }
  }
];
const sessionFields = [
  // ----------------------------------
  //         session: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["getAll"]
      }
    }
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 10,
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100
    },
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["getAll"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Time Range",
        name: "times",
        type: "fixedCollection",
        placeholder: "Add Time Range",
        required: true,
        default: {},
        options: [
          {
            displayName: "Times Properties",
            name: "timesProperties",
            values: [
              {
                displayName: "Start Time",
                name: "fromTime",
                type: "dateTime",
                description: "Start of the datetime range for the session",
                default: ""
              },
              {
                displayName: "End Time",
                name: "toTime",
                type: "dateTime",
                description: "End of the datetime range for the session",
                default: ""
              }
            ]
          }
        ]
      },
      {
        displayName: "Webinar Key Name or ID",
        name: "webinarKey",
        type: "options",
        typeOptions: {
          loadOptionsMethod: "getWebinars"
        },
        default: {},
        description: 'Webinar by which to filter the sessions to retrieve. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.'
      }
    ]
  },
  // ----------------------------------
  //      session: shared fields
  // ----------------------------------
  {
    displayName: "Webinar Key Name or ID",
    name: "webinarKey",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getWebinars"
    },
    required: true,
    default: [],
    description: 'Key of the webinar to which the session belongs. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["get", "getDetails"]
      }
    }
  },
  {
    displayName: "Session Key",
    name: "sessionKey",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["get", "getDetails"]
      }
    }
  },
  // ----------------------------------
  //        session: getDetails
  // ----------------------------------
  {
    displayName: "Details",
    name: "details",
    type: "options",
    default: "performance",
    options: [
      {
        name: "Performance",
        value: "performance",
        description: "Performance details for a webinar session"
      },
      {
        name: "Polls",
        value: "polls",
        description: "Questions and answers for polls from a webinar session"
      },
      {
        name: "Questions",
        value: "questions",
        description: "Questions and answers for a past webinar session"
      },
      {
        name: "Surveys",
        value: "surveys",
        description: "Surveys for a past webinar session"
      }
    ],
    displayOptions: {
      show: {
        resource: ["session"],
        operation: ["getDetails"]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sessionFields,
  sessionOperations
});
//# sourceMappingURL=SessionDescription.js.map