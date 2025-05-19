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
var GoogleCalendar_node_exports = {};
__export(GoogleCalendar_node_exports, {
  GoogleCalendar: () => GoogleCalendar
});
module.exports = __toCommonJS(GoogleCalendar_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_uuid = require("uuid");
var import_CalendarDescription = require("./CalendarDescription");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_utilities = require("../../../utils/utilities");
class GoogleCalendar {
  constructor() {
    this.description = {
      displayName: "Google Calendar",
      name: "googleCalendar",
      icon: "file:googleCalendar.svg",
      group: ["input"],
      version: [1, 1.1, 1.2, 1.3],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Google Calendar API",
      defaults: {
        name: "Google Calendar"
      },
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      usableAsTool: true,
      credentials: [
        {
          name: "googleCalendarOAuth2Api",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Calendar",
              value: "calendar"
            },
            {
              name: "Event",
              value: "event"
            }
          ],
          default: "event"
        },
        ...import_CalendarDescription.calendarOperations,
        ...import_CalendarDescription.calendarFields,
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        {
          displayName: "This node will use the time zone set in n8n\u2019s settings, but you can override this in the workflow settings",
          name: "useN8nTimeZone",
          type: "notice",
          default: ""
        }
      ]
    };
    this.methods = {
      listSearch: {
        getCalendars: import_GenericFunctions.getCalendars,
        getTimezones: import_GenericFunctions.getTimezones
      },
      loadOptions: {
        // Get all the calendars to display them to user so that they can
        // select them easily
        async getConferenceSolutions() {
          const returnData = [];
          const calendar = this.getCurrentNodeParameter("calendar", { extractValue: true });
          const possibleSolutions = {
            eventHangout: "Google Hangout",
            eventNamedHangout: "Google Hangout Classic",
            hangoutsMeet: "Google Meet"
          };
          const {
            conferenceProperties: { allowedConferenceSolutionTypes }
          } = await import_GenericFunctions.googleApiRequest.call(
            this,
            "GET",
            `/calendar/v3/users/me/calendarList/${calendar}`
          );
          for (const solution of allowedConferenceSolutionTypes) {
            returnData.push({
              name: possibleSolutions[solution],
              value: solution
            });
          }
          return returnData;
        },
        // Get all the colors to display them to user so that they can
        // select them easily
        async getColors() {
          const returnData = [];
          const { event } = await import_GenericFunctions.googleApiRequest.call(this, "GET", "/calendar/v3/colors");
          for (const key of Object.keys(event)) {
            const colorName = `Background: ${event[key].background} - Foreground: ${event[key].foreground}`;
            const colorId = key;
            returnData.push({
              name: `${colorName}`,
              value: colorId
            });
          }
          return returnData;
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    const hints = [];
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const timezone = this.getTimezone();
    const nodeVersion = this.getNode().typeVersion;
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "calendar") {
          if (operation === "availability") {
            const calendarId = decodeURIComponent(
              this.getNodeParameter("calendar", i, "", { extractValue: true })
            );
            const timeMin = (0, import_GenericFunctions.dateObjectToISO)(this.getNodeParameter("timeMin", i));
            const timeMax = (0, import_GenericFunctions.dateObjectToISO)(this.getNodeParameter("timeMax", i));
            const options = this.getNodeParameter("options", i);
            const outputFormat = options.outputFormat || "availability";
            const tz = this.getNodeParameter("options.timezone", i, "", {
              extractValue: true
            });
            const body = {
              timeMin: (0, import_moment_timezone.default)(timeMin).utc().format(),
              timeMax: (0, import_moment_timezone.default)(timeMax).utc().format(),
              items: [
                {
                  id: calendarId
                }
              ],
              timeZone: tz || timezone
            };
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              "/calendar/v3/freeBusy",
              body,
              {}
            );
            if (responseData.calendars[calendarId].errors) {
              throw new import_n8n_workflow.NodeApiError(
                this.getNode(),
                responseData.calendars[calendarId],
                {
                  itemIndex: i
                }
              );
            }
            if (outputFormat === "availability") {
              responseData = {
                available: !responseData.calendars[calendarId].busy.length
              };
            } else if (outputFormat === "bookedSlots") {
              responseData = responseData.calendars[calendarId].busy;
            }
          }
        }
        if (resource === "event") {
          if (operation === "create") {
            const calendarId = (0, import_GenericFunctions.encodeURIComponentOnce)(
              this.getNodeParameter("calendar", i, "", { extractValue: true })
            );
            const start = (0, import_GenericFunctions.dateObjectToISO)(this.getNodeParameter("start", i));
            const end = (0, import_GenericFunctions.dateObjectToISO)(this.getNodeParameter("end", i));
            const useDefaultReminders = this.getNodeParameter("useDefaultReminders", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.maxAttendees) {
              qs.maxAttendees = additionalFields.maxAttendees;
            }
            if (additionalFields.sendNotifications) {
              qs.sendNotifications = additionalFields.sendNotifications;
            }
            if (additionalFields.sendUpdates) {
              qs.sendUpdates = additionalFields.sendUpdates;
            }
            const body = {
              start: {
                dateTime: import_moment_timezone.default.tz(start, timezone).utc().format(),
                timeZone: timezone
              },
              end: {
                dateTime: import_moment_timezone.default.tz(end, timezone).utc().format(),
                timeZone: timezone
              }
            };
            if (additionalFields.attendees) {
              body.attendees = [];
              additionalFields.attendees.forEach((attendee) => {
                body.attendees.push.apply(
                  body.attendees,
                  attendee.split(",").map((a) => a.trim()).map((email) => ({ email }))
                );
              });
            }
            if (additionalFields.color) {
              body.colorId = additionalFields.color;
            }
            if (additionalFields.description) {
              body.description = additionalFields.description;
            }
            if (additionalFields.guestsCanInviteOthers) {
              body.guestsCanInviteOthers = additionalFields.guestsCanInviteOthers;
            }
            if (additionalFields.guestsCanModify) {
              body.guestsCanModify = additionalFields.guestsCanModify;
            }
            if (additionalFields.guestsCanSeeOtherGuests) {
              body.guestsCanSeeOtherGuests = additionalFields.guestsCanSeeOtherGuests;
            }
            if (additionalFields.id) {
              body.id = additionalFields.id;
            }
            if (additionalFields.location) {
              body.location = additionalFields.location;
            }
            if (additionalFields.summary) {
              body.summary = additionalFields.summary;
            }
            if (additionalFields.showMeAs) {
              body.transparency = additionalFields.showMeAs;
            }
            if (additionalFields.visibility) {
              body.visibility = additionalFields.visibility;
            }
            if (!useDefaultReminders) {
              const reminders = this.getNodeParameter("remindersUi", i).remindersValues;
              body.reminders = {
                useDefault: false
              };
              if (reminders) {
                body.reminders.overrides = reminders;
              }
            }
            if (additionalFields.allday === "yes") {
              body.start = {
                date: timezone ? import_moment_timezone.default.tz(start, timezone).utc(true).format("YYYY-MM-DD") : import_moment_timezone.default.tz(start, import_moment_timezone.default.tz.guess()).utc(true).format("YYYY-MM-DD")
              };
              body.end = {
                date: timezone ? import_moment_timezone.default.tz(end, timezone).utc(true).format("YYYY-MM-DD") : import_moment_timezone.default.tz(end, import_moment_timezone.default.tz.guess()).utc(true).format("YYYY-MM-DD")
              };
            }
            body.recurrence = [];
            if (additionalFields.rrule) {
              body.recurrence = [`RRULE:${additionalFields.rrule}`];
            } else {
              if (additionalFields.repeatHowManyTimes && additionalFields.repeatUntil) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "You can set either 'Repeat How Many Times' or 'Repeat Until' but not both",
                  { itemIndex: i }
                );
              }
              if (additionalFields.repeatFrecuency) {
                body.recurrence?.push(
                  `FREQ=${additionalFields.repeatFrecuency.toUpperCase()};`
                );
              }
              if (additionalFields.repeatHowManyTimes) {
                body.recurrence?.push(`COUNT=${additionalFields.repeatHowManyTimes};`);
              }
              if (additionalFields.repeatUntil) {
                const repeatUntil = (0, import_moment_timezone.default)(additionalFields.repeatUntil).utc().format("YYYYMMDDTHHmmss");
                body.recurrence?.push(`UNTIL=${repeatUntil}Z`);
              }
              if (body.recurrence.length !== 0) {
                body.recurrence = [`RRULE:${body.recurrence.join("")}`];
              }
            }
            if (additionalFields.conferenceDataUi) {
              const conferenceData = additionalFields.conferenceDataUi.conferenceDataValues;
              if (conferenceData) {
                qs.conferenceDataVersion = 1;
                body.conferenceData = {
                  createRequest: {
                    requestId: (0, import_uuid.v4)(),
                    conferenceSolution: {
                      type: conferenceData.conferenceSolution
                    }
                  }
                };
              }
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "POST",
              `/calendar/v3/calendars/${calendarId}/events`,
              body,
              qs
            );
          }
          if (operation === "delete") {
            const calendarId = (0, import_GenericFunctions.encodeURIComponentOnce)(
              this.getNodeParameter("calendar", i, "", { extractValue: true })
            );
            const eventId = this.getNodeParameter("eventId", i);
            const options = this.getNodeParameter("options", i);
            if (options.sendUpdates) {
              qs.sendUpdates = options.sendUpdates;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "DELETE",
              `/calendar/v3/calendars/${calendarId}/events/${eventId}`,
              {}
            );
            responseData = { success: true };
          }
          if (operation === "get") {
            const calendarId = (0, import_GenericFunctions.encodeURIComponentOnce)(
              this.getNodeParameter("calendar", i, "", { extractValue: true })
            );
            const eventId = this.getNodeParameter("eventId", i);
            const options = this.getNodeParameter("options", i);
            const tz = this.getNodeParameter("options.timeZone", i, "", {
              extractValue: true
            });
            if (options.maxAttendees) {
              qs.maxAttendees = options.maxAttendees;
            }
            if (tz) {
              qs.timeZone = tz;
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "GET",
              `/calendar/v3/calendars/${calendarId}/events/${eventId}`,
              {},
              qs
            );
            if (responseData) {
              if (nodeVersion >= 1.3 && options.returnNextInstance && responseData.recurrence) {
                const eventInstances = (await import_GenericFunctions.googleApiRequest.call(
                  this,
                  "GET",
                  `/calendar/v3/calendars/${calendarId}/events/${responseData.id}/instances`,
                  {},
                  {
                    timeMin: (/* @__PURE__ */ new Date()).toISOString(),
                    maxResults: 1
                  }
                )).items || [];
                responseData = eventInstances[0] ? [eventInstances[0]] : [responseData];
              } else {
                responseData = (0, import_GenericFunctions.addNextOccurrence)([responseData]);
              }
            }
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const calendarId = (0, import_GenericFunctions.encodeURIComponentOnce)(
              this.getNodeParameter("calendar", i, "", { extractValue: true })
            );
            const options = this.getNodeParameter("options", i);
            const tz = this.getNodeParameter("options.timeZone", i, "", {
              extractValue: true
            });
            if (nodeVersion >= 1.3) {
              const timeMin = (0, import_GenericFunctions.dateObjectToISO)(this.getNodeParameter("timeMin", i));
              const timeMax = (0, import_GenericFunctions.dateObjectToISO)(this.getNodeParameter("timeMax", i));
              if (timeMin) {
                qs.timeMin = (0, import_GenericFunctions.addTimezoneToDate)(timeMin, tz || timezone);
              }
              if (timeMax) {
                qs.timeMax = (0, import_GenericFunctions.addTimezoneToDate)(timeMax, tz || timezone);
              }
              if (!options.recurringEventHandling || options.recurringEventHandling === "expand") {
                qs.singleEvents = true;
              }
            }
            if (options.iCalUID) {
              qs.iCalUID = options.iCalUID;
            }
            if (options.maxAttendees) {
              qs.maxAttendees = options.maxAttendees;
            }
            if (options.orderBy) {
              qs.orderBy = options.orderBy;
            }
            if (options.query) {
              qs.q = options.query;
            }
            if (options.showDeleted) {
              qs.showDeleted = options.showDeleted;
            }
            if (options.showHiddenInvitations) {
              qs.showHiddenInvitations = options.showHiddenInvitations;
            }
            if (options.singleEvents) {
              qs.singleEvents = options.singleEvents;
            }
            if (options.timeMax) {
              qs.timeMax = (0, import_GenericFunctions.addTimezoneToDate)((0, import_GenericFunctions.dateObjectToISO)(options.timeMax), tz || timezone);
            }
            if (options.timeMin) {
              qs.timeMin = (0, import_GenericFunctions.addTimezoneToDate)((0, import_GenericFunctions.dateObjectToISO)(options.timeMin), tz || timezone);
            }
            if (tz) {
              qs.timeZone = tz;
            }
            if (options.updatedMin) {
              qs.updatedMin = (0, import_GenericFunctions.addTimezoneToDate)(
                (0, import_GenericFunctions.dateObjectToISO)(options.updatedMin),
                tz || timezone
              );
            }
            if (options.fields) {
              qs.fields = options.fields;
            }
            if (returnAll) {
              responseData = await import_GenericFunctions.googleApiRequestAllItems.call(
                this,
                "items",
                "GET",
                `/calendar/v3/calendars/${calendarId}/events`,
                {},
                qs
              );
            } else {
              qs.maxResults = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.googleApiRequest.call(
                this,
                "GET",
                `/calendar/v3/calendars/${calendarId}/events`,
                {},
                qs
              );
              responseData = responseData.items;
            }
            if (responseData) {
              if (nodeVersion >= 1.3 && options.recurringEventHandling === "next") {
                const updatedEvents = [];
                for (const event of responseData) {
                  if (event.recurrence) {
                    const eventInstances = (await (0, import_GenericFunctions.googleApiRequestWithRetries)({
                      context: this,
                      method: "GET",
                      resource: `/calendar/v3/calendars/${calendarId}/events/${event.id}/instances`,
                      qs: {
                        timeMin: (/* @__PURE__ */ new Date()).toISOString(),
                        maxResults: 1
                      },
                      itemIndex: i
                    })).items || [];
                    updatedEvents.push(eventInstances[0] || event);
                    continue;
                  }
                  updatedEvents.push(event);
                }
                responseData = updatedEvents;
              } else if (nodeVersion >= 1.3 && options.recurringEventHandling === "first") {
                responseData = responseData.filter((event) => {
                  if (qs.timeMin && event.recurrence && event.created && event.created < qs.timeMin) {
                    return false;
                  }
                  if (qs.timeMax && event.recurrence && event.created && event.created > qs.timeMax) {
                    return false;
                  }
                  return true;
                });
              } else if (nodeVersion < 1.3) {
                responseData = (0, import_GenericFunctions.addNextOccurrence)(responseData);
              }
              if (!qs.timeMax && (!options.recurringEventHandling || options.recurringEventHandling === "expand")) {
                const suggestTrim = (0, import_GenericFunctions.eventExtendYearIntoFuture)(
                  responseData,
                  timezone
                );
                if (suggestTrim) {
                  hints.push({
                    message: "Some events repeat far into the future. To return less of them, add a 'Before' date or change the 'Recurring Event Handling' option.",
                    location: "outputPane"
                  });
                }
              }
            }
          }
          if (operation === "update") {
            const calendarId = (0, import_GenericFunctions.encodeURIComponentOnce)(
              this.getNodeParameter("calendar", i, "", { extractValue: true })
            );
            let eventId = this.getNodeParameter("eventId", i);
            if (nodeVersion >= 1.3) {
              const modifyTarget = this.getNodeParameter("modifyTarget", i, "instance");
              if (modifyTarget === "event") {
                const instance = await import_GenericFunctions.googleApiRequest.call(
                  this,
                  "GET",
                  `/calendar/v3/calendars/${calendarId}/events/${eventId}`,
                  {},
                  qs
                );
                eventId = instance.recurringEventId;
              }
            }
            const useDefaultReminders = this.getNodeParameter("useDefaultReminders", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            let updateTimezone = updateFields.timezone;
            if (nodeVersion > 1 && updateTimezone === void 0) {
              updateTimezone = timezone;
            }
            if (updateFields.maxAttendees) {
              qs.maxAttendees = updateFields.maxAttendees;
            }
            if (updateFields.sendNotifications) {
              qs.sendNotifications = updateFields.sendNotifications;
            }
            if (updateFields.sendUpdates) {
              qs.sendUpdates = updateFields.sendUpdates;
            }
            const body = {};
            if (updateFields.start) {
              body.start = {
                dateTime: import_moment_timezone.default.tz(updateFields.start, updateTimezone).utc().format(),
                timeZone: updateTimezone
              };
            }
            if (updateFields.end) {
              body.end = {
                dateTime: import_moment_timezone.default.tz(updateFields.end, updateTimezone).utc().format(),
                timeZone: updateTimezone
              };
            }
            if (updateFields.attendees) {
              body.attendees = [];
              updateFields.attendees.forEach((attendee) => {
                body.attendees.push.apply(
                  body.attendees,
                  attendee.split(",").map((a) => a.trim()).map((email) => ({ email }))
                );
              });
            }
            if (updateFields.attendeesUi) {
              const { mode, attendees } = updateFields.attendeesUi.values;
              body.attendees = [];
              if (mode === "add") {
                const event = await import_GenericFunctions.googleApiRequest.call(
                  this,
                  "GET",
                  `/calendar/v3/calendars/${calendarId}/events/${eventId}`
                );
                (event?.attendees || []).forEach((attendee) => {
                  body.attendees?.push(attendee);
                });
              }
              attendees.forEach((attendee) => {
                body.attendees.push.apply(
                  body.attendees,
                  attendee.split(",").map((a) => a.trim()).map((email) => ({ email }))
                );
              });
            }
            if (updateFields.color) {
              body.colorId = updateFields.color;
            }
            if (updateFields.description) {
              body.description = updateFields.description;
            }
            if (updateFields.guestsCanInviteOthers) {
              body.guestsCanInviteOthers = updateFields.guestsCanInviteOthers;
            }
            if (updateFields.guestsCanModify) {
              body.guestsCanModify = updateFields.guestsCanModify;
            }
            if (updateFields.guestsCanSeeOtherGuests) {
              body.guestsCanSeeOtherGuests = updateFields.guestsCanSeeOtherGuests;
            }
            if (updateFields.id) {
              body.id = updateFields.id;
            }
            if (updateFields.location) {
              body.location = updateFields.location;
            }
            if (updateFields.summary) {
              body.summary = updateFields.summary;
            }
            if (updateFields.showMeAs) {
              body.transparency = updateFields.showMeAs;
            }
            if (updateFields.visibility) {
              body.visibility = updateFields.visibility;
            }
            if (!useDefaultReminders) {
              const reminders = this.getNodeParameter("remindersUi", i).remindersValues;
              body.reminders = {
                useDefault: false
              };
              if (reminders) {
                body.reminders.overrides = reminders;
              }
            }
            if (updateFields.allday === "yes" && updateFields.start && updateFields.end) {
              body.start = {
                date: updateTimezone ? import_moment_timezone.default.tz(updateFields.start, updateTimezone).utc(true).format("YYYY-MM-DD") : import_moment_timezone.default.tz(updateFields.start, import_moment_timezone.default.tz.guess()).utc(true).format("YYYY-MM-DD")
              };
              body.end = {
                date: updateTimezone ? import_moment_timezone.default.tz(updateFields.end, updateTimezone).utc(true).format("YYYY-MM-DD") : import_moment_timezone.default.tz(updateFields.end, import_moment_timezone.default.tz.guess()).utc(true).format("YYYY-MM-DD")
              };
            }
            body.recurrence = [];
            if (updateFields.rrule) {
              body.recurrence = [`RRULE:${updateFields.rrule}`];
            } else {
              if (updateFields.repeatHowManyTimes && updateFields.repeatUntil) {
                throw new import_n8n_workflow.NodeOperationError(
                  this.getNode(),
                  "You can set either 'Repeat How Many Times' or 'Repeat Until' but not both",
                  { itemIndex: i }
                );
              }
              if (updateFields.repeatFrecuency) {
                body.recurrence?.push(
                  `FREQ=${updateFields.repeatFrecuency.toUpperCase()};`
                );
              }
              if (updateFields.repeatHowManyTimes) {
                body.recurrence?.push(`COUNT=${updateFields.repeatHowManyTimes};`);
              }
              if (updateFields.repeatUntil) {
                const repeatUntil = (0, import_moment_timezone.default)(updateFields.repeatUntil).utc().format("YYYYMMDDTHHmmss");
                body.recurrence?.push(`UNTIL=${repeatUntil}Z`);
              }
              if (body.recurrence.length !== 0) {
                body.recurrence = [`RRULE:${body.recurrence.join("")}`];
              } else {
                delete body.recurrence;
              }
            }
            responseData = await import_GenericFunctions.googleApiRequest.call(
              this,
              "PATCH",
              `/calendar/v3/calendars/${calendarId}/events/${eventId}`,
              body,
              qs
            );
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (!this.continueOnFail()) {
          throw error;
        } else {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
      }
    }
    const keysPriorityList = [
      "id",
      "summary",
      "start",
      "end",
      "attendees",
      "creator",
      "organizer",
      "description",
      "location",
      "created",
      "updated"
    ];
    let nodeExecutionData = returnData;
    if (nodeVersion >= 1.3) {
      nodeExecutionData = (0, import_utilities.sortItemKeysByPriorityList)(returnData, keysPriorityList);
    }
    if (hints.length) {
      this.addExecutionHints(...hints);
    }
    return [nodeExecutionData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleCalendar
});
//# sourceMappingURL=GoogleCalendar.node.js.map