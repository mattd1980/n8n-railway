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
var GoToWebinar_node_exports = {};
__export(GoToWebinar_node_exports, {
  GoToWebinar: () => GoToWebinar
});
module.exports = __toCommonJS(GoToWebinar_node_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_omit = __toESM(require("lodash/omit"));
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_descriptions = require("./descriptions");
var import_GenericFunctions = require("./GenericFunctions");
class GoToWebinar {
  constructor() {
    this.description = {
      displayName: "GoToWebinar",
      name: "goToWebinar",
      icon: "file:gotowebinar.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume the GoToWebinar API",
      defaults: {
        name: "GoToWebinar"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "goToWebinarOAuth2Api",
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
              name: "Attendee",
              value: "attendee"
            },
            {
              name: "Co-Organizer",
              value: "coorganizer"
            },
            {
              name: "Panelist",
              value: "panelist"
            },
            {
              name: "Registrant",
              value: "registrant"
            },
            {
              name: "Session",
              value: "session"
            },
            {
              name: "Webinar",
              value: "webinar"
            }
          ],
          default: "attendee"
        },
        ...import_descriptions.attendeeOperations,
        ...import_descriptions.attendeeFields,
        ...import_descriptions.coorganizerOperations,
        ...import_descriptions.coorganizerFields,
        ...import_descriptions.panelistOperations,
        ...import_descriptions.panelistFields,
        ...import_descriptions.registrantOperations,
        ...import_descriptions.registrantFields,
        ...import_descriptions.sessionOperations,
        ...import_descriptions.sessionFields,
        ...import_descriptions.webinarOperations,
        ...import_descriptions.webinarFields
      ]
    };
    this.methods = {
      loadOptions: {
        async getWebinars() {
          return await import_GenericFunctions.loadWebinars.call(this);
        },
        async getAnswers() {
          return await import_GenericFunctions.loadAnswers.call(this);
        },
        async getWebinarSessions() {
          return await import_GenericFunctions.loadWebinarSessions.call(this);
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
        },
        async getRegistranSimpleQuestions() {
          return await import_GenericFunctions.loadRegistranSimpleQuestions.call(this);
        },
        async getRegistranMultiChoiceQuestions() {
          return await import_GenericFunctions.loadRegistranMultiChoiceQuestions.call(this);
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    let responseData;
    const returnData = [];
    const { oauthTokenData } = await this.getCredentials("goToWebinarOAuth2Api");
    const accountKey = oauthTokenData.account_key;
    const organizerKey = oauthTokenData.organizer_key;
    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === "attendee") {
          if (operation === "get") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const sessionKey = this.getNodeParameter("sessionKey", i);
            const registrantKey = this.getNodeParameter("registrantKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/sessions/${sessionKey}/attendees/${registrantKey}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
          } else if (operation === "getAll") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const sessionKey = this.getNodeParameter("sessionKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/sessions/${sessionKey}/attendees`;
            responseData = await import_GenericFunctions.handleGetAll.call(this, endpoint, {}, {}, resource);
          } else if (operation === "getDetails") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const sessionKey = this.getNodeParameter("sessionKey", i);
            const registrantKey = this.getNodeParameter("registrantKey", i);
            const details = this.getNodeParameter("details", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/sessions/${sessionKey}/attendees/${registrantKey}/${details}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
          }
        } else if (resource === "coorganizer") {
          if (operation === "create") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const body = {
              external: this.getNodeParameter("isExternal", i)
            };
            if (body.external === false) {
              body.organizerKey = this.getNodeParameter("organizerKey", i);
            }
            if (body.external === true) {
              body.givenName = this.getNodeParameter("givenName", i);
              body.email = this.getNodeParameter("email", i);
            }
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/coorganizers`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "POST", endpoint, {}, [body]);
          } else if (operation === "delete") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const coorganizerKey = this.getNodeParameter("coorganizerKey", i);
            const qs = {
              external: this.getNodeParameter("isExternal", i)
            };
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/coorganizers/${coorganizerKey}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "DELETE", endpoint, qs, {});
            responseData = { success: true };
          } else if (operation === "getAll") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/coorganizers`;
            responseData = await import_GenericFunctions.handleGetAll.call(this, endpoint, {}, {}, resource);
          } else if (operation === "reinvite") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const coorganizerKey = this.getNodeParameter("coorganizerKey", i);
            const qs = {
              external: this.getNodeParameter("isExternal", i)
            };
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/coorganizers/${coorganizerKey}/resendInvitation`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "POST", endpoint, qs, {});
            responseData = { success: true };
          }
        } else if (resource === "panelist") {
          if (operation === "create") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const body = [
              {
                name: this.getNodeParameter("name", i),
                email: this.getNodeParameter("email", i)
              }
            ];
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/panelists`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "POST", endpoint, {}, body);
          } else if (operation === "delete") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const panelistKey = this.getNodeParameter("panelistKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/panelists/${panelistKey}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "DELETE", endpoint, {}, {});
            responseData = { success: true };
          } else if (operation === "getAll") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/panelists`;
            responseData = await import_GenericFunctions.handleGetAll.call(this, endpoint, {}, {}, resource);
          } else if (operation === "reinvite") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const panelistKey = this.getNodeParameter("panelistKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/panelists/${panelistKey}/resendInvitation`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "POST", endpoint, {}, {});
            responseData = { success: true };
          }
        } else if (resource === "registrant") {
          if (operation === "create") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const qs = {};
            const body = {
              firstName: this.getNodeParameter("firstName", i),
              lastName: this.getNodeParameter("lastName", i),
              email: this.getNodeParameter("email", i),
              responses: []
            };
            let additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.resendConfirmation) {
              qs.resendConfirmation = additionalFields.resendConfirmation;
              additionalFields = (0, import_omit.default)(additionalFields, ["resendConfirmation"]);
            }
            if (additionalFields.fullAddress) {
              Object.assign(body, additionalFields.fullAddress.details);
              additionalFields = (0, import_omit.default)(additionalFields, ["fullAddress"]);
            }
            if (additionalFields.simpleResponses) {
              body.responses.push(...additionalFields.simpleResponses.details);
              additionalFields = (0, import_omit.default)(additionalFields, ["simpleResponses"]);
            }
            if (additionalFields.multiChoiceResponses) {
              body.responses.push(...additionalFields.multiChoiceResponses.details);
              additionalFields = (0, import_omit.default)(additionalFields, ["multiChoiceResponses"]);
            }
            Object.assign(body, additionalFields);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/registrants`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "POST", endpoint, qs, body);
          } else if (operation === "delete") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const registrantKey = this.getNodeParameter("registrantKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/registrants/${registrantKey}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "DELETE", endpoint, {}, {});
            responseData = { success: true };
          } else if (operation === "get") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const registrantKey = this.getNodeParameter("registrantKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/registrants/${registrantKey}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
          } else if (operation === "getAll") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/registrants`;
            responseData = await import_GenericFunctions.handleGetAll.call(this, endpoint, {}, {}, resource);
          }
        } else if (resource === "session") {
          if (operation === "get") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const sessionKey = this.getNodeParameter("sessionKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/sessions/${sessionKey}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
          } else if (operation === "getAll") {
            const qs = {};
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", 0);
            }
            const { webinarKey, times } = this.getNodeParameter("additionalFields", i);
            if (times) {
              qs.fromTime = (0, import_moment_timezone.default)(times.timesProperties.fromTime).format();
              qs.toTime = (0, import_moment_timezone.default)(times.timesProperties.toTime).format();
            } else {
              qs.fromTime = (0, import_moment_timezone.default)().subtract(1, "years").format();
              qs.toTime = (0, import_moment_timezone.default)().format();
            }
            if (webinarKey !== void 0) {
              const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/sessions`;
              responseData = await import_GenericFunctions.goToWebinarApiRequestAllItems.call(
                this,
                "GET",
                endpoint,
                qs,
                {},
                resource
              );
            } else {
              const endpoint = `organizers/${organizerKey}/sessions`;
              responseData = await import_GenericFunctions.goToWebinarApiRequestAllItems.call(
                this,
                "GET",
                endpoint,
                qs,
                {},
                resource
              );
            }
          } else if (operation === "getDetails") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const sessionKey = this.getNodeParameter("sessionKey", i);
            const details = this.getNodeParameter("details", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}/sessions/${sessionKey}/${details}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
          }
        } else if (resource === "webinar") {
          if (operation === "create") {
            const timesProperties = this.getNodeParameter(
              "times.timesProperties",
              i,
              []
            );
            const body = {
              subject: this.getNodeParameter("subject", i),
              times: timesProperties
            };
            const additionalFields = this.getNodeParameter("additionalFields", i);
            Object.assign(body, additionalFields);
            const endpoint = `organizers/${organizerKey}/webinars`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "POST", endpoint, {}, body);
          } else if (operation === "delete") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const { sendCancellationEmails } = this.getNodeParameter("additionalFields", i);
            const qs = {};
            if (sendCancellationEmails) {
              qs.sendCancellationEmails = sendCancellationEmails;
            }
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}`;
            await import_GenericFunctions.goToWebinarApiRequest.call(this, "DELETE", endpoint, qs, {});
            responseData = { success: true };
          } else if (operation === "get") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}`;
            responseData = await import_GenericFunctions.goToWebinarApiRequest.call(this, "GET", endpoint, {}, {});
          } else if (operation === "getAll") {
            const qs = {};
            const returnAll = this.getNodeParameter("returnAll", 0);
            if (!returnAll) {
              qs.limit = this.getNodeParameter("limit", 0);
            }
            const { times } = this.getNodeParameter("additionalFields", i);
            if (times) {
              qs.fromTime = (0, import_moment_timezone.default)(times.timesProperties.fromTime).format();
              qs.toTime = (0, import_moment_timezone.default)(times.timesProperties.toTime).format();
            } else {
              qs.fromTime = (0, import_moment_timezone.default)().subtract(1, "years").format();
              qs.toTime = (0, import_moment_timezone.default)().format();
            }
            const endpoint = `accounts/${accountKey}/webinars`;
            responseData = await import_GenericFunctions.goToWebinarApiRequestAllItems.call(
              this,
              "GET",
              endpoint,
              qs,
              {},
              resource
            );
          } else if (operation === "update") {
            const webinarKey = this.getNodeParameter("webinarKey", i);
            const qs = {
              notifyParticipants: this.getNodeParameter("notifyParticipants", i)
            };
            let body = {};
            let updateFields = this.getNodeParameter("updateFields", i);
            if (updateFields.times) {
              const { times } = updateFields;
              body = {
                times: times.timesProperties
              };
              updateFields = (0, import_omit.default)(updateFields, ["times"]);
            }
            Object.assign(body, updateFields);
            if ((0, import_isEmpty.default)(updateFields)) {
              throw new import_n8n_workflow.NodeOperationError(
                this.getNode(),
                `Please enter at least one field to update for the ${resource}.`,
                { itemIndex: i }
              );
            }
            const endpoint = `organizers/${organizerKey}/webinars/${webinarKey}`;
            await import_GenericFunctions.goToWebinarApiRequest.call(this, "PUT", endpoint, qs, body);
            responseData = { success: true };
          }
        }
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
      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    }
    return [returnData];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoToWebinar
});
//# sourceMappingURL=GoToWebinar.node.js.map