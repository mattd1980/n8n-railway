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
var getAll_operation_exports = {};
__export(getAll_operation_exports, {
  description: () => description,
  execute: () => execute,
  properties: () => properties
});
module.exports = __toCommonJS(getAll_operation_exports);
var import_utilities = require("../../../../../../utils/utilities");
var import_descriptions = require("../../descriptions");
var import_utils = require("../../helpers/utils");
var import_transport = require("../../transport");
const properties = [
  {
    displayName: "From All Calendars",
    name: "fromAllCalendars",
    type: "boolean",
    default: true
  },
  {
    ...import_descriptions.calendarRLC,
    displayOptions: {
      show: {
        fromAllCalendars: [false]
      }
    }
  },
  ...import_descriptions.returnAllOrLimit,
  {
    displayName: "Output",
    name: "output",
    type: "options",
    default: "simple",
    options: [
      {
        name: "Simplified",
        value: "simple"
      },
      {
        name: "Raw",
        value: "raw"
      },
      {
        name: "Select Included Fields",
        value: "fields"
      }
    ]
  },
  {
    displayName: "Fields",
    name: "fields",
    type: "multiOptions",
    description: "The fields to add to the output",
    displayOptions: {
      show: {
        output: ["fields"]
      }
    },
    options: import_utils.eventfields,
    default: []
  },
  {
    displayName: "Filters",
    name: "filters",
    type: "collection",
    placeholder: "Add Filter",
    default: {},
    options: [
      {
        displayName: "Filter Query",
        name: "custom",
        type: "string",
        default: "",
        placeholder: "e.g. contains(subject,'Hello')",
        hint: 'Search query to filter events. <a href="https://learn.microsoft.com/en-us/graph/filter-query-parameter">More info</a>.'
      }
    ]
  }
];
const displayOptions = {
  show: {
    resource: ["event"],
    operation: ["getAll"]
  }
};
const description = (0, import_utilities.updateDisplayOptions)(displayOptions, properties);
async function execute(index) {
  const responseData = [];
  const qs = {};
  const returnAll = this.getNodeParameter("returnAll", index);
  const filters = this.getNodeParameter("filters", index, {});
  const output = this.getNodeParameter("output", index);
  if (output === "fields") {
    const fields = this.getNodeParameter("fields", index);
    qs.$select = fields.join(",");
  }
  if (output === "simple") {
    qs.$select = "id,subject,bodyPreview,start,end,organizer,attendees,webLink";
  }
  if (Object.keys(filters).length) {
    const filterString = [];
    if (filters.custom) {
      filterString.push(filters.custom);
    }
    if (filterString.length) {
      qs.$filter = filterString.join(" and ");
    }
  }
  const calendars = [];
  const fromAllCalendars = this.getNodeParameter("fromAllCalendars", index);
  if (fromAllCalendars) {
    const response = await import_transport.microsoftApiRequest.call(this, "GET", "/calendars", void 0, {
      $select: "id"
    });
    for (const calendar of response.value) {
      calendars.push(calendar.id);
    }
  } else {
    const calendarId = this.getNodeParameter("calendarId", index, void 0, {
      extractValue: true
    });
    calendars.push(calendarId);
  }
  const limit = this.getNodeParameter("limit", index, 0);
  for (const calendarId of calendars) {
    const endpoint = `/calendars/${calendarId}/events`;
    if (returnAll) {
      const response = await import_transport.microsoftApiRequestAllItems.call(
        this,
        "value",
        "GET",
        endpoint,
        void 0,
        qs
      );
      responseData.push(...response);
    } else {
      qs.$top = limit - responseData.length;
      if (qs.$top <= 0) break;
      const response = await import_transport.microsoftApiRequest.call(this, "GET", endpoint, void 0, qs);
      responseData.push(...response.value);
    }
  }
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
//# sourceMappingURL=getAll.operation.js.map