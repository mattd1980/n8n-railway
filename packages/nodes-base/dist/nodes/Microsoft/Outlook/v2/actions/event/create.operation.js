"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var create_operation_exports = {};
__export(create_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(create_operation_exports);
var import_luxon = require("luxon");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.calendarRLC,
  {
    displayName: "Title",
    name: "subject",
    type: "string",
    default: "",
    required: true
  },
  {
    displayName: "Start",
    name: "startDateTime",
    type: "dateTime",
    default: import_luxon.DateTime.now().toISO(),
    required: true
  },
  {
    displayName: "End",
    name: "endDateTime",
    type: "dateTime",
    required: true,
    default: import_luxon.DateTime.now().plus({ minutes: 30 }).toISO()
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    options: [
      {
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
        displayName: "Categories",
        name: "categories",
        type: "multiOptions",
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
          loadOptionsMethod: "getCategoriesNames"
        },
        default: []
      },
      {
        displayName: "Description",
        name: "body",
        type: "string",
        typeOptions: {
          rows: 2
        },
        default: ""
      },
      {
        displayName: "Description Preview",
        name: "bodyPreview",
        type: "string",
        default: ""
      },
      {
        displayName: "Hide Attendees",
        name: "hideAttendees",
        type: "boolean",
        default: false,
        description: "Whether to allow each attendee to only see themselves in the meeting request and meeting tracking list"
      },
      {
        displayName: "Importance",
        name: "importance",
        type: "options",
        options: [
          {
            name: "Low",
            value: "low"
          },
          {
            name: "Normal",
            value: "normal"
          },
          {
            name: "High",
            value: "high"
          }
        ],
        default: "normal"
      },
      {
        displayName: "Is All Day",
        name: "isAllDay",
        type: "boolean",
        default: false
      },
      {
        displayName: "Is Cancelled",
        name: "isCancelled",
        type: "boolean",
        default: false
      },
      {
        displayName: "Is Draft",
        name: "isDraft",
        type: "boolean",
        default: false
      },
      {
        displayName: "Is Online Meeting",
        name: "isOnlineMeeting",
        type: "boolean",
        default: false
      },
      {
        displayName: "Sensitivity",
        name: "sensitivity",
        type: "options",
        default: "normal",
        options: [
          {
            name: "Normal",
            value: "normal"
          },
          {
            name: "Personal",
            value: "personal"
          },
          {
            name: "Private",
            value: "private"
          },
          {
            name: "Confidential",
            value: "confidential"
          }
        ]
      },
      {
        displayName: "Show As",
        name: "showAs",
        type: "options",
        default: "free",
        options: [
          {
            name: "Busy",
            value: "busy"
          },
          {
            name: "Free",
            value: "free"
          },
          {
            name: "Oof",
            value: "oof"
          },
          {
            name: "Tentative",
            value: "tentative"
          },
          {
            name: "Working Elsewhere",
            value: "workingElsewhere"
          }
        ]
      },
      {
        displayName: "Timezone",
        name: "timeZone",
        type: "options",
        default: "UTC",
        options: import_moment_timezone.default.tz.names().map((name) => ({
          name,
          value: name
        }))
      },
      {
        displayName: "Type",
        name: "type",
        type: "options",
        default: "singleInstance",
        options: [
          {
            name: "Single Instance",
            value: "singleInstance"
          },
          {
            name: "Occurrence",
            value: "occurrence"
          },
          {
            name: "Exception",
            value: "exception"
          },
          {
            name: "Series Master",
            value: "seriesMaster"
          }
        ]
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["event"],
    operation: ["create"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  let additionalFields = this.getNodeParameter("additionalFields", index);
  additionalFields = Object.keys(additionalFields).reduce((acc, key) => {
    if (additionalFields[key] !== "" || additionalFields[key] !== void 0) {
      acc[key] = additionalFields[key];
    }
    return acc;
  }, {});
  const calendarId = this.getNodeParameter("calendarId", index, "", {
    extractValue: true
  });
  if (calendarId === "") {
    throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Calendar ID is required");
  }
  const subject = this.getNodeParameter("subject", index);
  const endpoint = `/calendars/${calendarId}/events`;
  let timeZone = "UTC";
  if (additionalFields.timeZone) {
    timeZone = additionalFields.timeZone;
    delete additionalFields.timeZone;
  }
  if (additionalFields.body) {
    additionalFields.body = {
      content: additionalFields.body,
      contentType: "html"
    };
  }
  let startDateTime = this.getNodeParameter("startDateTime", index);
  let endDateTime = this.getNodeParameter("endDateTime", index);
  if (additionalFields.isAllDay) {
    startDateTime = import_luxon.DateTime.fromISO(startDateTime, { zone: timeZone }).toFormat("yyyy-MM-dd");
    endDateTime = import_luxon.DateTime.fromISO(endDateTime, { zone: timeZone }).toFormat("yyyy-MM-dd");
    const minimalWholeDayDuration = 24;
    const duration = import_luxon.DateTime.fromISO(startDateTime, { zone: timeZone }).diff(
      import_luxon.DateTime.fromISO(endDateTime, { zone: timeZone })
    ).hours;
    if (duration < minimalWholeDayDuration) {
      endDateTime = import_luxon.DateTime.fromISO(startDateTime, { zone: timeZone }).plus({ hours: 24 }).toISO();
    }
  }
  const body = {
    subject,
    start: {
      dateTime: startDateTime,
      timeZone
    },
    end: {
      dateTime: endDateTime,
      timeZone
    },
    ...additionalFields
  };
  const responseData = await import_transport.microsoftApiRequest.call(this, "POST", endpoint, body);
  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData),
    { itemData: { item: index } }
  );
  return executionData;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  description,
  execute,
  properties
});
//# sourceMappingURL=create.operation.js.map