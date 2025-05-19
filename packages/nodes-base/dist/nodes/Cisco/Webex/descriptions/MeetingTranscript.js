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
var MeetingTranscript_exports = {};
__export(MeetingTranscript_exports, {
  meetingTranscriptFields: () => meetingTranscriptFields,
  meetingTranscriptOperations: () => meetingTranscriptOperations
});
module.exports = __toCommonJS(MeetingTranscript_exports);
const meetingTranscriptOperations = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["meetingTranscript"]
      }
    },
    options: [
      {
        name: "Download",
        value: "download",
        action: "Download a meeting transcript"
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get many meeting transcripts"
      }
    ],
    default: "download"
  }
];
const meetingTranscriptFields = [
  // ----------------------------------------
  //             meetingTranscript: download
  // ----------------------------------------
  {
    displayName: "Transcript ID",
    name: "transcriptId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["meetingTranscript"],
        operation: ["download"]
      }
    },
    description: "Unique identifier for the meeting transcript"
  },
  {
    displayName: "Meeting ID",
    name: "meetingId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["meetingTranscript"],
        operation: ["download"]
      }
    },
    description: "Unique identifier for the meeting instance which the transcripts belong to"
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    displayOptions: {
      show: {
        resource: ["meetingTranscript"],
        operation: ["download"]
      }
    },
    default: {},
    placeholder: "Add option",
    options: [
      {
        displayName: "Format",
        name: "format",
        type: "options",
        options: [
          {
            // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
            name: "txt",
            value: "txt"
          },
          {
            // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
            name: "vtt",
            value: "vtt"
          }
        ],
        default: "vtt",
        description: "Format for the downloaded meeting transcript"
      }
    ]
  },
  // ----------------------------------------
  //             meetingTranscript: getAll
  // ----------------------------------------
  {
    displayName: "Meeting ID",
    name: "meetingId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["meetingTranscript"],
        operation: ["getAll"]
      }
    },
    description: "Unique identifier for the meeting instance which the transcripts belong to"
  },
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    description: "Whether to return all results or only up to a given limit",
    displayOptions: {
      show: {
        resource: ["meetingTranscript"],
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
        resource: ["meetingTranscript"],
        operation: ["getAll"],
        returnAll: [false]
      }
    }
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    displayOptions: {
      show: {
        resource: ["meetingTranscript"],
        operation: ["getAll"]
      }
    },
    options: [
      {
        displayName: "Host Email",
        name: "hostEmail",
        type: "string",
        default: "",
        description: "Email address for the meetingTranscript host"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  meetingTranscriptFields,
  meetingTranscriptOperations
});
//# sourceMappingURL=MeetingTranscript.js.map