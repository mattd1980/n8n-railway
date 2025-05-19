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
var Strava_node_exports = {};
__export(Strava_node_exports, {
  Strava: () => Strava
});
module.exports = __toCommonJS(Strava_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_ActivityDescription = require("./ActivityDescription");
var import_GenericFunctions = require("./GenericFunctions");
class Strava {
  constructor() {
    this.description = {
      displayName: "Strava",
      name: "strava",
      icon: "file:strava.svg",
      group: ["input"],
      version: [1, 1.1],
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume Strava API",
      defaults: {
        name: "Strava"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "stravaOAuth2Api",
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
              name: "Activity",
              value: "activity"
            }
          ],
          default: "activity"
        },
        ...import_ActivityDescription.activityOperations,
        ...import_ActivityDescription.activityFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    const qs = {};
    let responseData;
    const nodeVersion = this.getNode().typeVersion;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    for (let i = 0; i < length; i++) {
      try {
        if (resource === "activity") {
          if (operation === "create") {
            const name = this.getNodeParameter("name", i);
            const startDate = this.getNodeParameter("startDate", i);
            const elapsedTime = this.getNodeParameter("elapsedTime", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            if (additionalFields.trainer === true) {
              additionalFields.trainer = 1;
            }
            if (additionalFields.commute === true) {
              additionalFields.commute = 1;
            }
            const body = {
              name,
              start_date_local: (0, import_moment_timezone.default)(startDate).toISOString(),
              elapsed_time: elapsedTime
            };
            if (nodeVersion === 1) {
              const type = this.getNodeParameter("type", i);
              body.type = type;
            } else {
              const sportType = this.getNodeParameter("sport_type", i);
              body.sport_type = sportType;
            }
            Object.assign(body, additionalFields);
            responseData = await import_GenericFunctions.stravaApiRequest.call(this, "POST", "/activities", body);
          }
          if (operation === "get") {
            const activityId = this.getNodeParameter("activityId", i);
            responseData = await import_GenericFunctions.stravaApiRequest.call(this, "GET", `/activities/${activityId}`);
          }
          if (["getLaps", "getZones", "getKudos", "getComments"].includes(operation)) {
            const path = {
              getComments: "comments",
              getZones: "zones",
              getKudos: "kudos",
              getLaps: "laps"
            };
            const activityId = this.getNodeParameter("activityId", i);
            const returnAll = this.getNodeParameter("returnAll", i);
            responseData = await import_GenericFunctions.stravaApiRequest.call(
              this,
              "GET",
              `/activities/${activityId}/${path[operation]}`
            );
            if (!returnAll) {
              const limit = this.getNodeParameter("limit", i);
              responseData = responseData.splice(0, limit);
            }
          }
          if (operation === "getStreams") {
            const activityId = this.getNodeParameter("activityId", i);
            const keys = this.getNodeParameter("keys", i);
            qs.keys = keys.toString();
            qs.key_by_type = true;
            responseData = await import_GenericFunctions.stravaApiRequest.call(
              this,
              "GET",
              `/activities/${activityId}/streams`,
              {},
              qs
            );
          }
          if (operation === "getAll") {
            const returnAll = this.getNodeParameter("returnAll", i);
            if (returnAll) {
              responseData = await import_GenericFunctions.stravaApiRequestAllItems.call(
                this,
                "GET",
                "/activities",
                {},
                qs
              );
            } else {
              qs.per_page = this.getNodeParameter("limit", i);
              responseData = await import_GenericFunctions.stravaApiRequest.call(this, "GET", "/activities", {}, qs);
            }
          }
          if (operation === "update") {
            const activityId = this.getNodeParameter("activityId", i);
            const updateFields = this.getNodeParameter("updateFields", i);
            const body = {};
            Object.assign(body, updateFields);
            responseData = await import_GenericFunctions.stravaApiRequest.call(
              this,
              "PUT",
              `/activities/${activityId}`,
              body
            );
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
  Strava
});
//# sourceMappingURL=Strava.node.js.map