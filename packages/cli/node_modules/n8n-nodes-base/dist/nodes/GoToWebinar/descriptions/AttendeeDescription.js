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
var AttendeeDescription_exports = {};
__export(AttendeeDescription_exports, {
  attendeeFields: () => attendeeFields,
  attendeeOperations: () => attendeeOperations
});
module.exports = __toCommonJS(AttendeeDescription_exports);
const attendeeOperations = [
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
        action: "Get an attendee"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many attendees"
      },
      {
        name: "Get Details",
        value: "getDetails",
        action: "Get details of an attendee"
      }
    ],
    displayOptions: {
      show: {
        resource: ["attendee"]
      }
    }
  }
];
const attendeeFields = [
  // ----------------------------------
  //     attendee: shared fields
  // ----------------------------------
  {
    displayName: "Webinar Key Name or ID",
    name: "webinarKey",
    type: "options",
    typeOptions: {
      loadOptionsMethod: "getWebinars"
    },
    required: true,
    default: "",
    description: 'Key of the webinar that the attendee attended. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["attendee"]
      }
    }
  },
  {
    displayName: "Session Key Name or ID",
    name: "sessionKey",
    type: "options",
    required: true,
    typeOptions: {
      loadOptionsMethod: "getWebinarSessions",
      loadOptionsDependsOn: ["webinarKey"]
    },
    default: "",
    description: 'Key of the session that the attendee attended. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    displayOptions: {
      show: {
        resource: ["attendee"]
      }
    }
  },
  // ----------------------------------
  //          attendee: get
  // ----------------------------------
  {
    displayName: "Registrant Key",
    name: "registrantKey",
    type: "string",
    required: true,
    default: "",
    description: "Registrant key of the attendee at the webinar session",
    displayOptions: {
      show: {
        resource: ["attendee"],
        operation: ["get"]
      }
    }
  },
  // ----------------------------------
  //       attendee: getDetails
  // ----------------------------------
  {
    displayName: "Registrant Key",
    name: "registrantKey",
    type: "string",
    required: true,
    default: "",
    description: "Registrant key of the attendee at the webinar session",
    displayOptions: {
      show: {
        resource: ["attendee"],
        operation: ["getDetails"]
      }
    }
  },
  {
    displayName: "Details",
    name: "details",
    type: "options",
    required: true,
    default: "",
    description: "The details to retrieve for the attendee",
    options: [
      {
        name: "Polls",
        value: "polls",
        description: "Poll answers from the attendee in a webinar session"
      },
      {
        name: "Questions",
        value: "questions",
        description: "Questions asked by the attendee in a webinar session"
      },
      {
        name: "Survey Answers",
        value: "surveyAnswers",
        description: "Survey answers from the attendee in a webinar session"
      }
    ],
    displayOptions: {
      show: {
        resource: ["attendee"],
        operation: ["getDetails"]
      }
    }
  },
  // ----------------------------------
  //         attendee: getAll
  // ----------------------------------
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["attendee"],
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
        resource: ["attendee"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attendeeFields,
  attendeeOperations
});
//# sourceMappingURL=AttendeeDescription.js.map