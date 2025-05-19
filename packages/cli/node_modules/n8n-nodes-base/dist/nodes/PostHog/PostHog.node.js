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
var PostHog_node_exports = {};
__export(PostHog_node_exports, {
  PostHog: () => PostHog
});
module.exports = __toCommonJS(PostHog_node_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
var import_n8n_workflow = require("n8n-workflow");
var import_AliasDescription = require("./AliasDescription");
var import_EventDescription = require("./EventDescription");
var import_GenericFunctions = require("./GenericFunctions");
var import_IdentityDescription = require("./IdentityDescription");
var import_TrackDescription = require("./TrackDescription");
class PostHog {
  constructor() {
    this.description = {
      displayName: "PostHog",
      name: "postHog",
      icon: "file:postHog.svg",
      group: ["input"],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: "Consume PostHog API",
      defaults: {
        name: "PostHog"
      },
      usableAsTool: true,
      inputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      outputs: [import_n8n_workflow.NodeConnectionTypes.Main],
      credentials: [
        {
          name: "postHogApi",
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
              name: "Alias",
              value: "alias"
            },
            {
              name: "Event",
              value: "event"
            },
            {
              name: "Identity",
              value: "identity"
            },
            {
              name: "Track",
              value: "track"
            }
          ],
          default: "event"
        },
        ...import_AliasDescription.aliasOperations,
        ...import_AliasDescription.aliasFields,
        ...import_EventDescription.eventOperations,
        ...import_EventDescription.eventFields,
        ...import_IdentityDescription.identityOperations,
        ...import_IdentityDescription.identityFields,
        ...import_TrackDescription.trackOperations,
        ...import_TrackDescription.trackFields
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const length = items.length;
    let responseData;
    const resource = this.getNodeParameter("resource", 0);
    const operation = this.getNodeParameter("operation", 0);
    if (resource === "alias") {
      if (operation === "create") {
        for (let i = 0; i < length; i++) {
          try {
            const distinctId = this.getNodeParameter("distinctId", i);
            const alias = this.getNodeParameter("alias", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const context = additionalFields.contextUi?.contextValues || [];
            const event = {
              type: "alias",
              event: "$create_alias",
              context: context.reduce(
                (obj, value) => Object.assign(obj, { [`${value.key}`]: value.value }),
                {}
              ),
              properties: {
                distinct_id: distinctId,
                alias
              }
            };
            Object.assign(event, additionalFields);
            if (additionalFields.timestamp) {
              additionalFields.timestamp = (0, import_moment_timezone.default)(
                additionalFields.timestamp
              ).toISOString();
            }
            responseData = await import_GenericFunctions.posthogApiRequest.call(this, "POST", "/batch", event);
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "event") {
      if (operation === "create") {
        try {
          const events = [];
          for (let i = 0; i < length; i++) {
            const eventName = this.getNodeParameter("eventName", i);
            const distinctId = this.getNodeParameter("distinctId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const properties = additionalFields.propertiesUi?.propertyValues || [];
            const event = {
              event: eventName,
              properties: properties.reduce(
                (obj, value) => Object.assign(obj, { [`${value.key}`]: value.value }),
                {}
              )
            };
            event.properties.distinct_id = distinctId;
            Object.assign(event, additionalFields);
            if (additionalFields.timestamp) {
              additionalFields.timestamp = (0, import_moment_timezone.default)(
                additionalFields.timestamp
              ).toISOString();
            }
            delete event.propertiesUi;
            events.push(event);
          }
          responseData = await import_GenericFunctions.posthogApiRequest.call(this, "POST", "/capture", { batch: events });
          returnData.push(responseData);
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ error: error.message });
          } else {
            throw error;
          }
        }
      }
    }
    if (resource === "identity") {
      if (operation === "create") {
        for (let i = 0; i < length; i++) {
          try {
            const distinctId = this.getNodeParameter("distinctId", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const properties = additionalFields.propertiesUi?.propertyValues || [];
            const event = {
              event: "$identify",
              properties: properties.reduce(
                (obj, value) => Object.assign(obj, { [`${value.key}`]: value.value }),
                {}
              ),
              distinct_id: distinctId
            };
            Object.assign(event, additionalFields);
            if (additionalFields.timestamp) {
              additionalFields.timestamp = (0, import_moment_timezone.default)(
                additionalFields.timestamp
              ).toISOString();
            }
            delete event.propertiesUi;
            responseData = await import_GenericFunctions.posthogApiRequest.call(this, "POST", "/batch", event);
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    if (resource === "track") {
      if (operation === "page" || operation === "screen") {
        for (let i = 0; i < length; i++) {
          try {
            const distinctId = this.getNodeParameter("distinctId", i);
            const name = this.getNodeParameter("name", i);
            const additionalFields = this.getNodeParameter("additionalFields", i);
            const context = additionalFields.contextUi?.contextValues || [];
            const properties = additionalFields.propertiesUi?.propertyValues || [];
            const event = {
              name,
              type: operation,
              event: `$${operation}`,
              context: context.reduce(
                (obj, value) => Object.assign(obj, { [`${value.key}`]: value.value }),
                {}
              ),
              distinct_id: distinctId,
              properties: properties.reduce(
                (obj, value) => Object.assign(obj, { [`${value.key}`]: value.value }),
                {}
              )
            };
            Object.assign(event, additionalFields);
            if (additionalFields.timestamp) {
              additionalFields.timestamp = (0, import_moment_timezone.default)(
                additionalFields.timestamp
              ).toISOString();
            }
            delete event.propertiesUi;
            responseData = await import_GenericFunctions.posthogApiRequest.call(this, "POST", "/batch", event);
            returnData.push(responseData);
          } catch (error) {
            if (this.continueOnFail()) {
              returnData.push({ error: error.message });
              continue;
            }
            throw error;
          }
        }
      }
    }
    return [this.helpers.returnJsonArray(returnData)];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostHog
});
//# sourceMappingURL=PostHog.node.js.map