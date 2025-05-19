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
var GenericFunctions_exports = {};
__export(GenericFunctions_exports, {
  TIMEZONE_VALIDATION_REGEX: () => TIMEZONE_VALIDATION_REGEX,
  addNextOccurrence: () => addNextOccurrence,
  addTimezoneToDate: () => addTimezoneToDate,
  dateObjectToISO: () => dateObjectToISO,
  encodeURIComponentOnce: () => encodeURIComponentOnce,
  eventExtendYearIntoFuture: () => eventExtendYearIntoFuture,
  getCalendars: () => getCalendars,
  getTimezones: () => getTimezones,
  googleApiRequest: () => googleApiRequest,
  googleApiRequestAllItems: () => googleApiRequestAllItems,
  googleApiRequestWithRetries: () => googleApiRequestWithRetries
});
module.exports = __toCommonJS(GenericFunctions_exports);
var import_luxon = require("luxon");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_rrule = require("rrule");
async function googleApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body,
    qs,
    uri: uri || `https://www.googleapis.com${resource}`,
    json: true
  };
  try {
    if (Object.keys(headers).length !== 0) {
      options.headers = Object.assign({}, options.headers, headers);
    }
    if (Object.keys(body).length === 0) {
      delete options.body;
    }
    return await this.helpers.requestOAuth2.call(this, "googleCalendarOAuth2Api", options);
  } catch (error) {
    throw new import_n8n_workflow.NodeApiError(this.getNode(), error);
  }
}
async function googleApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}) {
  const returnData = [];
  let responseData;
  query.maxResults = 100;
  do {
    responseData = await googleApiRequest.call(this, method, endpoint, body, query);
    query.pageToken = responseData.nextPageToken;
    returnData.push.apply(returnData, responseData[propertyName]);
  } while (responseData.nextPageToken !== void 0 && responseData.nextPageToken !== "");
  return returnData;
}
function encodeURIComponentOnce(uri) {
  return encodeURIComponent(decodeURIComponent(uri));
}
async function getCalendars(filter) {
  const calendars = await googleApiRequestAllItems.call(
    this,
    "items",
    "GET",
    "/calendar/v3/users/me/calendarList"
  );
  const results = calendars.map((c) => ({
    name: c.summary,
    value: c.id
  })).filter(
    (c) => !filter || c.name.toLowerCase().includes(filter.toLowerCase()) || c.value?.toString() === filter
  ).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return { results };
}
const TIMEZONE_VALIDATION_REGEX = `(${import_moment_timezone.default.tz.names().map((t) => t.replace("+", "\\+")).join("|")})[ 	]*`;
async function getTimezones(filter) {
  const results = import_moment_timezone.default.tz.names().map((timezone) => ({
    name: timezone,
    value: timezone
  })).filter(
    (c) => !filter || c.name.toLowerCase().includes(filter.toLowerCase()) || c.value?.toString() === filter
  );
  return { results };
}
function addNextOccurrence(items) {
  for (const item of items) {
    if (item.recurrence) {
      let eventRecurrence;
      try {
        eventRecurrence = item.recurrence.find((r) => r.toUpperCase().startsWith("RRULE"));
        if (!eventRecurrence) continue;
        const start = (0, import_moment_timezone.default)(item.start.dateTime || item.end.date).utc();
        const end = (0, import_moment_timezone.default)(item.end.dateTime || item.end.date).utc();
        const rruleWithStartDate = `DTSTART:${start.format(
          "YYYYMMDDTHHmmss"
        )}Z
${eventRecurrence}`;
        const rrule = import_rrule.RRule.fromString(rruleWithStartDate);
        const until = rrule.options?.until;
        const now = (0, import_moment_timezone.default)().utc();
        if (until && (0, import_moment_timezone.default)(until).isBefore(now)) {
          continue;
        }
        const nextDate = rrule.after(now.toDate(), false);
        if (nextDate) {
          const nextStart = (0, import_moment_timezone.default)(nextDate);
          const duration = import_moment_timezone.default.duration((0, import_moment_timezone.default)(end).diff((0, import_moment_timezone.default)(start)));
          const nextEnd = (0, import_moment_timezone.default)(nextStart).add(duration);
          item.nextOccurrence = {
            start: {
              dateTime: nextStart.format(),
              timeZone: item.start.timeZone
            },
            end: {
              dateTime: nextEnd.format(),
              timeZone: item.end.timeZone
            }
          };
        }
      } catch (error) {
        console.log(`Error adding next occurrence ${eventRecurrence}`);
      }
    }
  }
  return items;
}
const hasTimezone = (date) => date.endsWith("Z") || /\+\d{2}:\d{2}$/.test(date);
function addTimezoneToDate(date, timezone) {
  if (hasTimezone(date)) return date;
  return import_moment_timezone.default.tz(date, timezone).utc().format();
}
async function requestWithRetries(node, requestFn, retryCount = 0, maxRetries = 10, itemIndex = 0) {
  try {
    return await requestFn();
  } catch (error) {
    if (!(error instanceof import_n8n_workflow.NodeApiError)) {
      throw new import_n8n_workflow.NodeOperationError(node, error.message, { itemIndex });
    }
    if (retryCount >= maxRetries) throw error;
    if (error.httpCode === "403" || error.httpCode === "429") {
      const delay = 1e3 * Math.pow(2, retryCount);
      console.log(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${retryCount + 1})`);
      await (0, import_n8n_workflow.sleep)(delay);
      return await requestWithRetries(node, requestFn, retryCount + 1, maxRetries, itemIndex);
    }
    throw error;
  }
}
async function googleApiRequestWithRetries({
  context,
  method,
  resource,
  body = {},
  qs = {},
  uri,
  headers = {},
  itemIndex = 0
}) {
  const requestFn = async () => {
    return await googleApiRequest.call(context, method, resource, body, qs, uri, headers);
  };
  const retryCount = 0;
  const maxRetries = 10;
  return await requestWithRetries(context.getNode(), requestFn, retryCount, maxRetries, itemIndex);
}
const eventExtendYearIntoFuture = (data, timezone, currentYear) => {
  const thisYear = currentYear || (0, import_moment_timezone.default)().tz(timezone).year();
  return data.some((event) => {
    if (!event.recurringEventId) return false;
    const eventStart = event.start.dateTime || event.start.date;
    const eventDateTime = (0, import_moment_timezone.default)(eventStart).tz(timezone);
    if (!eventDateTime.isValid()) return false;
    const targetYear = eventDateTime.year();
    if (targetYear - thisYear >= 1) {
      return true;
    } else {
      return false;
    }
  });
};
function dateObjectToISO(date) {
  if (date instanceof import_luxon.DateTime) return date.toISO();
  if (date instanceof Date) return date.toISOString();
  return date;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TIMEZONE_VALIDATION_REGEX,
  addNextOccurrence,
  addTimezoneToDate,
  dateObjectToISO,
  encodeURIComponentOnce,
  eventExtendYearIntoFuture,
  getCalendars,
  getTimezones,
  googleApiRequest,
  googleApiRequestAllItems,
  googleApiRequestWithRetries
});
//# sourceMappingURL=GenericFunctions.js.map