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
var GoogleCalendarTrigger_node_exports = {};
__export(GoogleCalendarTrigger_node_exports, {
  GoogleCalendarTrigger: () => GoogleCalendarTrigger
});
module.exports = __toCommonJS(GoogleCalendarTrigger_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
class GoogleCalendarTrigger {
  constructor() {
    this.description = {
      displayName: "Google Calendar Trigger",
      name: "googleCalendarTrigger",
      icon: "file:googleCalendar.svg",
      group: ["trigger"],
      version: 1,
      subtitle: '={{$parameter["triggerOn"]}}',
      description: "Starts the workflow when Google Calendar events occur",
      defaults: {
        name: "Google Calendar Trigger"
      },
      inputs: [],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "googleCalendarOAuth2Api",
          required: true
        }
      ],
      polling: true,
      properties: [
        {
          displayName: "Calendar",
          name: "calendarId",
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
          ]
        },
        {
          displayName: "Trigger On",
          name: "triggerOn",
          type: "options",
          required: true,
          default: "",
          options: [
            {
              name: "Event Cancelled",
              value: "eventCancelled"
            },
            {
              name: "Event Created",
              value: "eventCreated"
            },
            {
              name: "Event Ended",
              value: "eventEnded"
            },
            {
              name: "Event Started",
              value: "eventStarted"
            },
            {
              name: "Event Updated",
              value: "eventUpdated"
            }
          ]
        },
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add option",
          default: {},
          options: [
            {
              displayName: "Match Term",
              name: "matchTerm",
              type: "string",
              default: "",
              description: "Free text search terms to filter events that match these terms in any field, except for extended properties"
            }
          ]
        }
      ]
    };
    this.methods = {
      listSearch: {
        getCalendars: import_GenericFunctions.getCalendars
      }
    };
  }
  async poll() {
    const poolTimes = this.getNodeParameter("pollTimes.item", []);
    const triggerOn = this.getNodeParameter("triggerOn", "");
    const calendarId = (0, import_GenericFunctions.encodeURIComponentOnce)(
      this.getNodeParameter("calendarId", "", { extractValue: true })
    );
    const webhookData = this.getWorkflowStaticData("node");
    const matchTerm = this.getNodeParameter("options.matchTerm", "");
    if (poolTimes.length === 0) {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please set a poll time");
    }
    if (triggerOn === "") {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please select an event");
    }
    if (calendarId === "") {
      throw new import_n8n_workflow.NodeOperationError(this.getNode(), "Please select a calendar");
    }
    const now = (0, import_moment_timezone.default)().utc().format();
    const startDate = webhookData.lastTimeChecked || now;
    const endDate = now;
    const qs = {
      showDeleted: false
    };
    if (matchTerm !== "") {
      qs.q = matchTerm;
    }
    let events;
    if (triggerOn === "eventCreated" || triggerOn === "eventUpdated" || triggerOn === "eventCancelled") {
      Object.assign(qs, {
        updatedMin: startDate,
        orderBy: "updated",
        showDeleted: triggerOn === "eventCancelled"
      });
    } else if (triggerOn === "eventStarted" || triggerOn === "eventEnded") {
      Object.assign(qs, {
        singleEvents: true,
        timeMin: (0, import_moment_timezone.default)(startDate).startOf("second").utc().format(),
        timeMax: (0, import_moment_timezone.default)(endDate).endOf("second").utc().format(),
        orderBy: "startTime"
      });
    }
    if (this.getMode() === "manual") {
      delete qs.updatedMin;
      delete qs.timeMin;
      delete qs.timeMax;
      qs.maxResults = 1;
      events = await import_GenericFunctions.googleApiRequest.call(
        this,
        "GET",
        `/calendar/v3/calendars/${calendarId}/events`,
        {},
        qs
      );
      events = events.items;
    } else {
      events = await import_GenericFunctions.googleApiRequestAllItems.call(
        this,
        "items",
        "GET",
        `/calendar/v3/calendars/${calendarId}/events`,
        {},
        qs
      );
      if (triggerOn === "eventCreated") {
        events = events.filter(
          (event) => (0, import_moment_timezone.default)(event.created).isBetween(startDate, endDate)
        );
      } else if (triggerOn === "eventUpdated" || triggerOn === "eventCancelled") {
        events = events.filter(
          (event) => !(0, import_moment_timezone.default)((0, import_moment_timezone.default)(event.created).format("YYYY-MM-DDTHH:mm:ss")).isSame(
            (0, import_moment_timezone.default)(event.updated).format("YYYY-MM-DDTHH:mm:ss")
          )
        );
        if (triggerOn === "eventCancelled") {
          events = events.filter((event) => event.status === "cancelled");
        }
      } else if (triggerOn === "eventStarted") {
        events = events.filter(
          (event) => (0, import_moment_timezone.default)(event.start.dateTime).isBetween(startDate, endDate, null, "[]")
        );
      } else if (triggerOn === "eventEnded") {
        events = events.filter(
          (event) => (0, import_moment_timezone.default)(event.end.dateTime).isBetween(startDate, endDate, null, "[]")
        );
      }
    }
    webhookData.lastTimeChecked = endDate;
    if (Array.isArray(events) && events.length) {
      return [this.helpers.returnJsonArray(events)];
    }
    if (this.getMode() === "manual") {
      throw new import_n8n_workflow.NodeApiError(this.getNode(), {
        message: "No data with the current filter could be found"
      });
    }
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleCalendarTrigger
});
//# sourceMappingURL=GoogleCalendarTrigger.node.js.map