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
var Demio_node_exports = {};
__export(Demio_node_exports, {
  Demio: () => Demio
});
module.exports = __toCommonJS(Demio_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_ReportDescription = require("./ReportDescription");
class Demio {
  constructor() {
    this.description = {
      displayName: "Demio",
      name: "demio",
      icon: "file:demio.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the Demio API",
      defaults: {
        name: "Demio"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "demioApi",
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
              name: "Event",
              value: "event"
            },
            {
              name: "Report",
              value: "report"
            }
          ],
          default: "event"
        },
        // Event
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        // Report
        ...import_ReportDescription.reportOperations,
        ...import_ReportDescription.reportFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the events to display them to user so that they can
        // select them easily
        async getEvents() {
          const returnData = [];
          const events = await import_GenericFunctions.demioApiRequest.call(this, "GET", "/events", {}, { type: "upcoming" });
          for (const event of events) {
            returnData.push({
              name: event.name,
              value: event.id
            });
          }
          return returnData;
        },
        // Get all the sessions to display them to user so that they can
        // select them easily
        async getEventSessions() {
          const eventId = this.getCurrentNodeParameter("eventId");
          const qs = {};
          const resource = this.getCurrentNodeParameter("resource");
          if (resource !== "report") {
            qs.active = true;
          }
          const returnData = [];
          const { dates } = await import_GenericFunctions.demioApiRequest.call(this, "GET", `/event/${eventId}`, {});
          for (const date of dates) {
            returnData.push({
              name: date.datetime,
              value: date.date_id
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
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "event") {
          if (operation === "get") {
            const id = this.getNodeParameter("eventId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.date_id !== void 0) {
              responseData = await import_GenericFunctions.demioApiRequest.call(
                this,
                "GET",
                `/event/${id}/date/${additionalFields.date_id}`
              );
            } else {
              Object.assign(qs, additionalFields);
              responseData = await import_GenericFunctions.demioApiRequest.call(this, "GET", `/event/${id}`, {}, qs);
            }
          }
          if (operation === "getAll") {
            const filters = this.getNodeParameter("filters", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            Object.assign(qs, filters);
            responseData = await import_GenericFunctions.demioApiRequest.call(this, "GET", "/events", {}, qs);
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "register") {
            const eventId = this.getNodeParameter("eventId", i);
            const firstName = this.getNodeParameter("firstName", i);
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const body = {
              name: firstName,
              email,
              id: eventId
            };
            Object.assign(body, additionalFields);
            if (additionalFields.customFieldsUi) {
              const customFields = additionalFields.customFieldsUi?.customFieldsValues || [];
              const data = customFields.reduce(
                (obj, value) => Object.assign(obj, { [`${value.fieldId}`]: value.value }),
                {}
              );
              Object.assign(body, data);
              delete additionalFields.customFields;
            }
            responseData = await import_GenericFunctions.demioApiRequest.call(this, "PUT", "/event/register", body);
          }
        }
        if (resource === "report") {
          if (operation === "get") {
            const sessionId = this.getNodeParameter("dateId", i);
            const filters = this.getNodeParameter("filters", i);
            Object.assign(qs, filters);
            responseData = await import_GenericFunctions.demioApiRequest.call(
              this,
              "GET",
              `/report/${sessionId}/participants`,
              {},
              qs
            );
            responseData = responseData.participants;
          }
        }
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData);
        } else {
          returnData.push(responseData);
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ error: error.message });
          continue;
        }
        throw error;
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Demio
});
//# sourceMappingURL=Demio.node.js.map