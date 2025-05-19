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
var PagerDuty_node_exports = {};
__export(PagerDuty_node_exports, {
  PagerDuty: () => PagerDuty
});
module.exports = __toCommonJS(PagerDuty_node_exports);
var import_change_case = require("change-case");
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_GenericFunctions = require("./GenericFunctions");
var import_IncidentDescription = require("./IncidentDescription");
var import_IncidentNoteDescription = require("./IncidentNoteDescription");
var import_LogEntryDescription = require("./LogEntryDescription");
var import_UserDescription = require("./UserDescription");
class PagerDuty {
  constructor() {
    this.description = {
      displayName: "PagerDuty",
      name: "pagerDuty",
      icon: "file:pagerDuty.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume PagerDuty API",
      defaults: {
        name: "PagerDuty"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "pagerDutyApi",
          required: true,
          displayOptions: {
            show: {
              authentication: ["apiToken"]
            }
          }
        },
        {
          name: "pagerDutyOAuth2Api",
          required: true,
          displayOptions: {
            show: {
              authentication: ["oAuth2"]
            }
          }
        }
      ],
      properties: [
        {
          displayName: "Authentication",
          name: "authentication",
          type: "options",
          options: [
            {
              name: "API Token",
              value: "apiToken"
            },
            {
              name: "OAuth2",
              value: "oAuth2"
            }
          ],
          default: "apiToken"
        },
        {
          displayName: "Resource",
          name: "resource",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Incident",
              value: "incident"
            },
            {
              name: "Incident Note",
              value: "incidentNote"
            },
            {
              name: "Log Entry",
              value: "logEntry"
            },
            {
              name: "User",
              value: "user"
            }
          ],
          default: "incident"
        },
        // INCIDENT
        ...import_IncidentDescription.incidentOperations,
        ...import_IncidentDescription.incidentFields,
        // INCIDENT NOTE
        ...import_IncidentNoteDescription.incidentNoteOperations,
        ...import_IncidentNoteDescription.incidentNoteFields,
        // LOG ENTRY
        ...import_LogEntryDescription.logEntryOperations,
        ...import_LogEntryDescription.logEntryFields,
        // USER
        ...import_UserDescription.userOperations,
        ...import_UserDescription.userFields
      ]
    };
    this.methods = {
      loadOptions: {
        // Get all the available escalation policies to display them to user so that they can
        // select them easily
        async getEscalationPolicies() {
          const returnData = [];
          const escalationPolicies = await import_GenericFunctions.pagerDutyApiRequestAllItems.call(
            this,
            "escalation_policies",
            "GET",
            "/escalation_policies"
          );
          for (const escalationPolicy of escalationPolicies) {
            const escalationPolicyName = escalationPolicy.name;
            const escalationPolicyId = escalationPolicy.id;
            returnData.push({
              name: escalationPolicyName,
              value: escalationPolicyId
            });
          }
          return returnData;
        },
        // Get all the available priorities to display them to user so that they can
        // select them easily
        async getPriorities() {
          const returnData = [];
          const priorities = await import_GenericFunctions.pagerDutyApiRequestAllItems.call(
            this,
            "priorities",
            "GET",
            "/priorities"
          );
          for (const priority of priorities) {
            const priorityName = priority.name;
            const priorityId = priority.id;
            const priorityDescription = priority.description;
            returnData.push({
              name: priorityName,
              value: priorityId,
              description: priorityDescription
            });
          }
          return returnData;
        },
        // Get all the available services to display them to user so that they can
        // select them easily
        async getServices() {
          const returnData = [];
          const services = await import_GenericFunctions.pagerDutyApiRequestAllItems.call(
            this,
            "services",
            "GET",
            "/services"
          );
          for (const service of services) {
            const serviceName = service.name;
            const serviceId = service.id;
            returnData.push({
              name: serviceName,
              value: serviceId
            });
          }
          return returnData;
        },
        // Get all the timezones to display them to user so that they can
        // select them easily
        async getTimezones() {
          const returnData = [];
          for (const timezone of import_moment_timezone.default.tz.names()) {
            const timezoneName = timezone;
            const timezoneId = timezone;
            returnData.push({
              name: timezoneName,
              value: timezoneId
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
    let responseData;
    const qs = {};
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "incident") {
          if (operation === "create") {
            const title = this.getNodeParameter("title", i);
            const serviceId = this.getNodeParameter("serviceId", i);
            const email = this.getNodeParameter("email", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const conferenceBridge = this.getNodeParameter("conferenceBridgeUi", i).conferenceBridgeValues;
            const body = {
              type: "incident",
              title,
              service: {
                id: serviceId,
                type: "service_reference"
              }
            };
            if (additionalFields.details) {
              body.body = {
                type: "incident_body",
                details: additionalFields.details
              };
            }
            if (additionalFields.priorityId) {
              body.priority = {
                id: additionalFields.priorityId,
                type: "priority_reference"
              };
            }
            if (additionalFields.escalationPolicyId) {
              body.escalation_policy = {
                id: additionalFields.escalationPolicyId,
                type: "escalation_policy_reference"
              };
            }
            if (additionalFields.urgency) {
              body.urgency = additionalFields.urgency;
            }
            if (additionalFields.incidentKey) {
              body.incident_key = additionalFields.incidentKey;
            }
            if (conferenceBridge) {
              body.conference_bridge = {
                conference_number: conferenceBridge.conferenceNumber,
                conference_url: conferenceBridge.conferenceUrl
              };
            }
            responseData = await import_GenericFunctions.pagerDutyApiRequest.call(
              this,
              "POST",
              "/incidents",
              { incident: body },
              {},
              void 0,
              { from: email }
            );
            responseData = responseData.incident;
          }
          if (operation === "get") {
            const incidentId = this.getNodeParameter("incidentId", i);
            responseData = await import_GenericFunctions.pagerDutyApiRequest.call(this, "GET", `/incidents/${incidentId}`);
            responseData = responseData.incident;
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", 0);
            const options = this.getNodeParameter("options", 0);
            if (options.userIds) {
              options.userIds = options.userIds.split(",");
            }
            if (options.teamIds) {
              options.teamIds = options.teamIds.split(",");
            }
            if (options.include) {
              options.include = options.include.map((e) => (0, import_change_case.snakeCase)(e));
            }
            if (options.sortBy) {
              options.sortBy = options.sortBy;
            }
            Object.assign(qs, (0, import_GenericFunctions.keysToSnakeCase)(options)[0]);
            if (returnAll) {
              responseData = await import_GenericFunctions.pagerDutyApiRequestAllItems.call(
                this,
                "incidents",
                "GET",
                "/incidents",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.pagerDutyApiRequest.call(this, "GET", "/incidents", {}, qs);
              responseData = responseData.incidents;
            }
          }
          if (operation === "update") {
            const incidentId = this.getNodeParameter("incidentId", i);
            const email = this.getNodeParameter("email", i);
            const conferenceBridge = this.getNodeParameter("conferenceBridgeUi", i).conferenceBridgeValues;
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {
              type: "incident"
            };
            if (updateFields.title) {
              body.title = updateFields.title;
            }
            if (updateFields.escalationLevel) {
              body.escalation_level = updateFields.escalationLevel;
            }
            if (updateFields.details) {
              body.body = {
                type: "incident_body",
                details: updateFields.details
              };
            }
            if (updateFields.priorityId) {
              body.priority = {
                id: updateFields.priorityId,
                type: "priority_reference"
              };
            }
            if (updateFields.escalationPolicyId) {
              body.escalation_policy = {
                id: updateFields.escalationPolicyId,
                type: "escalation_policy_reference"
              };
            }
            if (updateFields.urgency) {
              body.urgency = updateFields.urgency;
            }
            if (updateFields.resolution) {
              body.resolution = updateFields.resolution;
            }
            if (updateFields.status) {
              body.status = updateFields.status;
            }
            if (conferenceBridge) {
              body.conference_bridge = {
                conference_number: conferenceBridge.conferenceNumber,
                conference_url: conferenceBridge.conferenceUrl
              };
            }
            responseData = await import_GenericFunctions.pagerDutyApiRequest.call(
              this,
              "PUT",
              `/incidents/${incidentId}`,
              { incident: body },
              {},
              void 0,
              { from: email }
            );
            responseData = responseData.incident;
          }
        }
        if (resource === "incidentNote") {
          if (operation === "create") {
            const incidentId = this.getNodeParameter("incidentId", i);
            const content = this.getNodeParameter("content", i);
            const email = this.getNodeParameter("email", i);
            const body = {
              content
            };
            responseData = await import_GenericFunctions.pagerDutyApiRequest.call(
              this,
              "POST",
              `/incidents/${incidentId}/notes`,
              { note: body },
              {},
              void 0,
              { from: email }
            );
          }
          if (operation === "getAll") {
            const incidentId = this.getNodeParameter("incidentId", i);
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (returnAll) {
              responseData = await import_GenericFunctions.pagerDutyApiRequestAllItems.call(
                this,
                "notes",
                "GET",
                `/incidents/${incidentId}/notes`,
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.pagerDutyApiRequest.call(
                this,
                "GET",
                `/incidents/${incidentId}/notes`,
                {},
                qs
              );
              responseData = responseData.notes;
            }
          }
        }
        if (resource === "logEntry") {
          if (operation === "get") {
            const logEntryId = this.getNodeParameter("logEntryId", i);
            responseData = await import_GenericFunctions.pagerDutyApiRequest.call(
              this,
              "GET",
              `/log_entries/${logEntryId}`
            );
            responseData = responseData.log_entry;
          }
          if (operation === "getAll") {
            const options = this.getNodeParameter("options", i);
            Object.assign(qs, options);
            (0, import_GenericFunctions.keysToSnakeCase)(qs);
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (returnAll) {
              responseData = await import_GenericFunctions.pagerDutyApiRequestAllItems.call(
                this,
                "log_entries",
                "GET",
                "/log_entries",
                {},
                qs
              );
            } else {
              qs.limit = this.getNodeParameter("limit", 0);
              responseData = await import_GenericFunctions.pagerDutyApiRequest.call(this, "GET", "/log_entries", {}, qs);
              responseData = responseData.log_entries;
            }
          }
        }
        if (resource === "user") {
          if (operation === "get") {
            const userId = this.getNodeParameter("userId", i);
            responseData = await import_GenericFunctions.pagerDutyApiRequest.call(this, "GET", `/users/${userId}`);
            responseData = responseData.user;
          }
        }
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PagerDuty
});
//# sourceMappingURL=PagerDuty.node.js.map