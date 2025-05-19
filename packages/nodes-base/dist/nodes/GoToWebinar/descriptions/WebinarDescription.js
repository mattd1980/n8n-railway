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
var WebinarDescription_exports = {};
__export(WebinarDescription_exports, {
  webinarFields: () => webinarFields,
  webinarOperations: () => webinarOperations
});
module.exports = __toCommonJS(WebinarDescription_exports);
const webinarOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    default: "get",
    options: [
      {
        name: "Create",
        value: "create",
        action: "Create a webinar"
      },
      // {
      // 	name: 'Delete',
      // 	value: 'delete',
      // },
      {
        name: "Get",
        value: "get",
        action: "Get a webinar"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many webinars"
      },
      {
        name: "Update",
        value: "update",
        action: "Update a webinar"
      }
    ],
    displayOptions: {
      show: {
        resource: ["webinar"]
      }
    }
  }
];
const webinarFields = [
  // ----------------------------------
  //         webinar: create
  // ----------------------------------
  {
    displayName: "Subject",
    name: "subject",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["create"]
      }
    }
  },
  {
    displayName: "Time Range",
    name: "times",
    type: "fixedCollection",
    required: true,
    placeholder: "Add Time Range",
    typeOptions: {
      multipleValues: true
    },
    default: {},
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["create"]
      }
    },
    options: [
      {
        displayName: "Times Properties",
        name: "timesProperties",
        values: [
          {
            displayName: "Start Time",
            name: "startTime",
            type: "dateTime",
            required: true,
            default: ""
          },
          {
            displayName: "End Time",
            name: "endTime",
            type: "dateTime",
            required: true,
            default: ""
          }
        ]
      }
    ]
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["create"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Experience Type",
        name: "experienceType",
        type: "options",
        default: "CLASSIC",
        options: [
          {
            name: "Classic",
            value: "CLASSIC"
          },
          {
            name: "Broadcast",
            value: "BROADCAST"
          },
          {
            name: "Simulive",
            value: "SIMULIVE"
          }
        ]
      },
      {
        displayName: "Is On-Demand",
        name: "isOnDemand",
        type: "boolean",
        default: false
      },
      {
        displayName: "Is Password Protected",
        name: "isPasswordProtected",
        type: "boolean",
        default: false
      },
      {
        displayName: "Timezone Name or ID",
        name: "timezone",
        type: "options",
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        default: "",
        placeholder: "2020-12-11T09:00:00Z",
        typeOptions: {
          alwaysOpenEditWindow: true,
          loadOptionsMethod: "getTimezones"
        }
      },
      {
        displayName: "Webinar Type",
        name: "type",
        type: "options",
        default: "single_session",
        options: [
          {
            name: "Single Session",
            value: "single_session",
            description: "Webinar with one single meeting"
          },
          {
            name: "Series",
            value: "series",
            description: "Webinar with multiple meetings times where attendees choose only one to attend"
          },
          {
            name: "Sequence",
            value: "sequence",
            description: "Webinar with multiple meeting times where attendees are expected to be the same for all sessions"
          }
        ]
      }
    ]
  },
  // ----------------------------------
  //         webinar: delete
  // ----------------------------------
  {
    displayName: "Webinar Key",
    name: "webinarKey",
    type: "string",
    required: true,
    default: "",
    description: "Key of the webinar to delete",
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["delete"]
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
        resource: ["webinar"],
        operation: ["delete"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Send Cancellation E-Mails",
        name: "sendCancellationEmails",
        type: "boolean",
        default: false
      }
    ]
  },
  // ----------------------------------
  //         webinar: get
  // ----------------------------------
  {
    displayName: "Webinar Key",
    name: "webinarKey",
    type: "string",
    required: true,
    default: "",
    description: "Key of the webinar to retrieve",
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //         webinar: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["webinar"],
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
        resource: ["webinar"],
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
        resource: ["webinar"],
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
                description: "Start of the datetime range for the webinar",
                default: ""
              },
              {
                displayName: "End Time",
                name: "toTime",
                type: "dateTime",
                description: "End of the datetime range for the webinar",
                default: ""
              }
            ]
          }
        ]
      }
    ]
  },
  // ----------------------------------
  //         webinar: update
  // ----------------------------------
  {
    displayName: "Webinar Key",
    name: "webinarKey",
    type: "string",
    required: true,
    default: "",
    description: "Key of the webinar to update",
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Notify Participants",
    name: "notifyParticipants",
    type: "boolean",
    required: true,
    default: false,
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["update"]
      }
    }
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    displayOptions: {
      show: {
        resource: ["webinar"],
        operation: ["update"]
      }
    },
    default: {},
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: ""
      },
      {
        displayName: "Experience Type",
        name: "experienceType",
        type: "options",
        default: "CLASSIC",
        options: [
          {
            name: "Classic",
            value: "CLASSIC"
          },
          {
            name: "Broadcast",
            value: "BROADCAST"
          },
          {
            name: "Simulive",
            value: "SIMULIVE"
          }
        ]
      },
      {
        displayName: "Is On-Demand",
        name: "isOnDemand",
        type: "boolean",
        default: false,
        description: "Whether the webinar may be watched anytime"
      },
      {
        displayName: "Is Password Protected",
        name: "isPasswordProtected",
        type: "boolean",
        default: false,
        description: "Whether the webinar requires a password for attendees to join"
      },
      {
        displayName: "Times",
        name: "times",
        type: "fixedCollection",
        default: {},
        typeOptions: {
          multipleValues: true
        },
        options: [
          {
            displayName: "Times Properties",
            name: "timesProperties",
            values: [
              {
                displayName: "Start Time",
                name: "startTime",
                type: "dateTime",
                required: true,
                default: ""
              },
              {
                displayName: "End Time",
                name: "endTime",
                type: "dateTime",
                required: true,
                default: ""
              }
            ]
          }
        ]
      },
      {
        displayName: "Subject",
        name: "subject",
        type: "string",
        default: "",
        description: "Name or topic of the webinar"
      },
      {
        displayName: "Timezone Name or ID",
        name: "timezone",
        type: "options",
        default: "",
        placeholder: "2020-12-11T09:00:00Z",
        description: 'Timezone where the webinar is to take place. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          alwaysOpenEditWindow: true,
          loadOptionsMethod: "getTimezones"
        }
      },
      {
        displayName: "Webinar Type",
        name: "type",
        type: "options",
        default: "single_session",
        options: [
          {
            name: "Single Session",
            value: "single_session",
            description: "Webinar with one single meeting"
          },
          {
            name: "Series",
            value: "series",
            description: "Webinar with multiple meetings times where attendees choose only one to attend"
          },
          {
            name: "Sequence",
            value: "sequence",
            description: "Webinar with multiple meeting times where attendees are expected to be the same for all sessions"
          }
        ]
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  webinarFields,
  webinarOperations
});
//# sourceMappingURL=WebinarDescription.js.map