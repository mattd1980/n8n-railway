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
var HomeAssistant_node_exports = {};
__export(HomeAssistant_node_exports, {
  HomeAssistant: () => HomeAssistant
});
module.exports = __toCommonJS(HomeAssistant_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var import_CameraProxyDescription = require("./CameraProxyDescription");
var import_ConfigDescription = require("./ConfigDescription");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_HistoryDescription = require("./HistoryDescription");
var import_LogDescription = require("./LogDescription");
var import_ServiceDescription = require("./ServiceDescription");
var import_StateDescription = require("./StateDescription");
var import_TemplateDescription = require("./TemplateDescription");
class HomeAssistant {
  constructor() {
    this.description = {
      displayName: "Home Assistant",
      name: "homeAssistant",
      icon: "file:homeAssistant.svg",
      group: ["output"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Home Assistant API",
      defaults: {
        name: "Home Assistant"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "homeAssistantApi",
          required: true,
          testedBy: "homeAssistantApiTest"
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
              name: "Camera Proxy",
              value: "cameraProxy"
            },
            {
              name: "Config",
              value: "config"
            },
            {
              name: "Event",
              value: "event"
            },
            // {
            // 	name: 'History',
            // 	value: 'history',
            // },
            {
              name: "Log",
              value: "log"
            },
            {
              name: "Service",
              value: "service"
            },
            {
              name: "State",
              value: "state"
            },
            {
              name: "Template",
              value: "template"
            }
          ],
          default: "config"
        },
        ...import_CameraProxyDescription.cameraProxyOperations,
        ...import_CameraProxyDescription.cameraProxyFields,
        ...import_ConfigDescription.configOperations,
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        ...import_HistoryDescription.historyOperations,
        ...import_HistoryDescription.historyFields,
        ...import_LogDescription.logOperations,
        ...import_LogDescription.logFields,
        ...import_ServiceDescription.serviceOperations,
        ...import_ServiceDescription.serviceFields,
        ...import_StateDescription.stateOperations,
        ...import_StateDescription.stateFields,
        ...import_TemplateDescription.templateOperations,
        ...import_TemplateDescription.templateFields
      ]
    };
    this.methods = {
      credentialTest: {
        async homeAssistantApiTest(credential) {
          const credentials = credential.data;
          const options = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`
            },
            uri: `${credentials.ssl === true ? "https" : "http"}://${credentials.host}:${credentials.port || "8123"}/api/`,
            json: true,
            timeout: 5e3
          };
          try {
            const response = await this.helpers.request(options);
            if (!response.message) {
              return {
                status: "Error",
                message: `Token is not valid: ${response.error}`
              };
            }
          } catch (error) {
            return {
              status: "Error",
              message: `${error.statusCode === 401 ? "Token is" : "Settings are"} not valid: ${error}`
            };
          }
          return {
            status: "OK",
            message: "Authentication successful!"
          };
        }
      },
      loadOptions: {
        async getAllEntities() {
          return await import_GenericFunctions.getHomeAssistantEntities.call(this);
        },
        async getCameraEntities() {
          return await import_GenericFunctions.getHomeAssistantEntities.call(this, "camera");
        },
        async getDomains() {
          return await import_GenericFunctions.getHomeAssistantServices.call(this);
        },
        async getDomainServices() {
          const currentDomain = this.getCurrentNodeParameter("domain");
          if (currentDomain) {
            return await import_GenericFunctions.getHomeAssistantServices.call(this, currentDomain);
          } else {
            return [];
          }
        }
      }
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    const qs = {};
    let responseData;
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "config") {
          if (operation === "get") {
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(this, "GET", "/config");
          } else if (operation === "check") {
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "POST",
              "/config/core/check_config"
            );
          }
        } else if (resource === "service") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "GET",
              "/services"
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          } else if (operation === "call") {
            const domain = this.getNodeParameter("domain", i);
            const service = this.getNodeParameter("service", i);
            const serviceAttributes = this.getNodeParameter("serviceAttributes", i);
            const body = {};
            if (Object.entries(serviceAttributes).length) {
              if (serviceAttributes.attributes !== void 0) {
                serviceAttributes.attributes.map((attribute) => {
                  body[attribute.name] = attribute.value;
                });
              }
            }
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "POST",
              `/services/${domain}/${service}`,
              body
            );
            if (Array.isArray(responseData) && responseData.length === 0) {
              responseData = {};
            }
          }
        } else if (resource === "state") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "GET",
              "/states"
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          } else if (operation === "get") {
            const entityId = this.getNodeParameter("entityId", i);
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(this, "GET", `/states/${entityId}`);
          } else if (operation === "upsert") {
            const entityId = this.getNodeParameter("entityId", i);
            const state = this.getNodeParameter("state", i);
            const stateAttributes = this.getNodeParameter("stateAttributes", i);
            const body = {
              state,
              attributes: {}
            };
            if (Object.entries(stateAttributes).length) {
              if (stateAttributes.attributes !== void 0) {
                stateAttributes.attributes.map((attribute) => {
                  body.attributes[attribute.name] = attribute.value;
                });
              }
            }
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "POST",
              `/states/${entityId}`,
              body
            );
          }
        } else if (resource === "event") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "GET",
              "/events"
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          } else if (operation === "create") {
            const eventType = this.getNodeParameter("eventType", i);
            const eventAttributes = this.getNodeParameter("eventAttributes", i);
            const body = {};
            if (Object.entries(eventAttributes).length) {
              if (eventAttributes.attributes !== void 0) {
                eventAttributes.attributes.map((attribute) => {
                  body[attribute.name] = attribute.value;
                });
              }
            }
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "POST",
              `/events/${eventType}`,
              body
            );
          }
        } else if (resource === "log") {
          if (operation === "getErroLogs") {
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(this, "GET", "/error_log");
            if (responseData) {
              responseData = {
                errorLog: responseData
              };
            }
          } else if (operation === "getLogbookEntries") {
            const additionalFields = this.getNodeParameter("additionalFields", i);
            let endpoint = "/logbook";
            if (Object.entries(additionalFields).length) {
              if (additionalFields.startTime) {
                endpoint = `/logbook/${additionalFields.startTime}`;
              }
              if (additionalFields.endTime) {
                qs.end_time = additionalFields.endTime;
              }
              if (additionalFields.entityId) {
                qs.entity = additionalFields.entityId;
              }
            }
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(this, "GET", endpoint, {}, qs);
          }
        } else if (resource === "template") {
          if (operation === "create") {
            const body = {
              template: this.getNodeParameter("template", i)
            };
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(this, "POST", "/template", body);
            if (responseData) {
              responseData = { renderedTemplate: responseData };
            }
          }
        } else if (resource === "history") {
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            let endpoint = "/history/period";
            if (Object.entries(additionalFields).length) {
              if (additionalFields.startTime) {
                endpoint = `/history/period/${additionalFields.startTime}`;
              }
              if (additionalFields.endTime) {
                qs.end_time = additionalFields.endTime;
              }
              if (additionalFields.entityIds) {
                qs.filter_entity_id = additionalFields.entityIds;
              }
              if (additionalFields.minimalResponse === true) {
                qs.minimal_response = additionalFields.minimalResponse;
              }
              if (additionalFields.significantChangesOnly === true) {
                qs.significant_changes_only = additionalFields.significantChangesOnly;
              }
            }
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "GET",
              endpoint,
              {},
              qs
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.slice(0, limit);
            }
          }
        } else if (resource === "cameraProxy") {
          if (operation === "getScreenshot") {
            const cameraEntityId = this.getNodeParameter("cameraEntityId", i);
            const dataPropertyNameDownload = this.getNodeParameter("binaryPropertyName", i);
            const endpoint = `/camera_proxy/${cameraEntityId}`;
            let mimeType;
            responseData = await import_GenericFunctions.homeAssistantApiRequest.call(
              this,
              "GET",
              endpoint,
              {},
              {},
              void 0,
              {
                encoding: null,
                resolveWithFullResponse: true
              }
            );
            const newItem = {
              json: items[i].json,
              binary: {}
            };
            if (mimeType === void 0 && responseData.headers["content-type"]) {
              mimeType = responseData.headers["content-type"];
            }
            if (items[i].binary !== void 0 && newItem.binary) {
              Object.assign(newItem.binary, items[i].binary);
            }
            items[i] = newItem;
            const data = Buffer.from(responseData.body);
            items[i].binary[dataPropertyNameDownload] = await this.helpers.prepareBinaryData(
              data,
              "screenshot.jpg",
              mimeType
            );
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          if (resource === "cameraProxy" && operation === "get") {
            items[i].json = { error: error.message };
          } else {
            const executionData2 = this.helpers.constructExecutionMetaData(
              this.helpers.returnJsonArray({ error: error.message }),
              { itemData: { item: i } }
            );
            returnData.push(...executionData2);
          }
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
    if (resource === "cameraProxy" && operation === "getScreenshot") {
      return [items];
    } else {
      return [returnData];
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HomeAssistant
});
//# sourceMappingURL=HomeAssistant.node.js.map