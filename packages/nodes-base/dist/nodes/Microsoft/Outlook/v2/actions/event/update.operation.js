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
var update_operation_exports = {};
__export(update_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(update_operation_exports);
var import_luxon = require("luxon");
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  import_descriptions.calendarRLC,
  import_descriptions.eventRLC,
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
        displayName: "End",
        name: "end",
        type: "dateTime",
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
        default: "low",
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
        ]
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
        default: true
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
        displayName: "Start",
        name: "start",
        type: "dateTime",
        default: ""
      },
      {
        displayName: "Timezone",
        name: "timeZone",
        type: "string",
        default: ""
      },
      {
        displayName: "Title",
        name: "subject",
        type: "string",
        default: ""
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
    operation: ["update"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const additionalFields = this.getNodeParameter("additionalFields", index);
  const eventId = (0, import_utils.decodeOutlookId)(
    this.getNodeParameter("eventId", index, void 0, {
      extractValue: true
    })
  );
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
  let startDateTime = additionalFields.start;
  let endDateTime = additionalFields.end;
  if (additionalFields.isAllDay) {
    startDateTime = import_luxon.DateTime.fromISO(startDateTime, { zone: timeZone }).toFormat("yyyy-MM-dd") || import_luxon.DateTime.utc().toFormat("yyyy-MM-dd");
    endDateTime = import_luxon.DateTime.fromISO(endDateTime, { zone: timeZone }).toFormat("yyyy-MM-dd") || import_luxon.DateTime.utc().toFormat("yyyy-MM-dd");
    const minimalWholeDayDuration = 24;
    const duration = import_luxon.DateTime.fromISO(startDateTime, { zone: timeZone }).diff(
      import_luxon.DateTime.fromISO(endDateTime, { zone: timeZone })
    ).hours;
    if (duration < minimalWholeDayDuration) {
      endDateTime = import_luxon.DateTime.fromISO(startDateTime, { zone: timeZone }).plus({ hours: 24 }).toISO();
    }
  }
  const body = {
    ...additionalFields
  };
  if (startDateTime) {
    body.start = {
      dateTime: startDateTime,
      timeZone
    };
  }
  if (endDateTime) {
    body.end = {
      dateTime: endDateTime,
      timeZone
    };
  }
  const endpoint = `/calendar/events/${eventId}`;
  const responseData = await import_transport.microsoftApiRequest.call(this, "PATCH", endpoint, body);
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
//# sourceMappingURL=update.operation.js.map